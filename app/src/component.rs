use std::collections::HashSet;

use proc_macro2::TokenStream;
use quote::quote;
use syn::{visit_mut::VisitMut, BinOp, Expr, ItemFn, Pat, Stmt};

fn extract_ident(expr: &Expr) -> Option<String> {
    match expr {
        Expr::Path(p) => p.path.get_ident().map(|i| i.to_string()),
        Expr::Paren(p) => extract_ident(&p.expr),
        _ => None,
    }
}

fn mut_ident_from_pat(pat: &Pat) -> Option<String> {
    match pat {
        Pat::Ident(pi) if pi.mutability.is_some() => Some(pi.ident.to_string()),
        Pat::Type(pt) => mut_ident_from_pat(&pt.pat),
        _ => None,
    }
}

fn remove_mut_from_pat(pat: &mut Pat) {
    match pat {
        Pat::Ident(pi) => pi.mutability = None,
        Pat::Type(pt) => remove_mut_from_pat(&mut pt.pat),
        _ => {}
    }
}

fn compound_to_binop(op: &BinOp) -> Option<TokenStream> {
    match op {
        BinOp::AddAssign(_) => Some(quote! { + }),
        BinOp::SubAssign(_) => Some(quote! { - }),
        BinOp::MulAssign(_) => Some(quote! { * }),
        BinOp::DivAssign(_) => Some(quote! { / }),
        BinOp::RemAssign(_) => Some(quote! { % }),
        BinOp::BitAndAssign(_) => Some(quote! { & }),
        BinOp::BitOrAssign(_) => Some(quote! { | }),
        BinOp::BitXorAssign(_) => Some(quote! { ^ }),
        BinOp::ShlAssign(_) => Some(quote! { << }),
        BinOp::ShrAssign(_) => Some(quote! { >> }),
        _ => None,
    }
}

struct Transformer {
    reactive: HashSet<String>,
}

impl VisitMut for Transformer {
    fn visit_expr_mut(&mut self, expr: &mut Expr) {
        match expr {
            Expr::Assign(assign) => {
                if let Some(name) = extract_ident(&assign.left) {
                    if self.reactive.contains(&name) {
                        let left = &assign.left;
                        let right = &assign.right;
                        *expr = syn::parse_quote! { #left.set(#right) };
                        return;
                    }
                }
            }
            Expr::Binary(binary) => {
                if let Some(op) = compound_to_binop(&binary.op) {
                    if let Some(name) = extract_ident(&binary.left) {
                        if self.reactive.contains(&name) {
                            let left = &binary.left;
                            let right = &binary.right;
                            *expr = syn::parse_quote! {
                                #left.update(|__v| __v #op (#right))
                            };
                            return;
                        }
                    }
                }
            }
            _ => {}
        }
        syn::visit_mut::visit_expr_mut(self, expr);
    }
}

pub(crate) fn transform(mut func: ItemFn) -> TokenStream {
    // Pass 1: collect top-level `let mut` identifiers
    let mut reactive: HashSet<String> = HashSet::new();
    for stmt in &func.block.stmts {
        if let Stmt::Local(local) = stmt {
            if let Some(name) = mut_ident_from_pat(&local.pat) {
                reactive.insert(name);
            }
        }
    }

    // Pass 2: `let mut x = expr` → `let x = Signal::new(expr)`
    for stmt in &mut func.block.stmts {
        if let Stmt::Local(local) = stmt {
            let name = mut_ident_from_pat(&local.pat);
            if name.as_deref().map_or(false, |n| reactive.contains(n)) {
                if let Some(ref mut init) = local.init {
                    let orig = init.expr.clone();
                    *init.expr = syn::parse_quote! { Signal::new(#orig) };
                }
                remove_mut_from_pat(&mut local.pat);
            }
        }
    }

    // Pass 3: transform assignments
    let mut transformer = Transformer { reactive };
    syn::visit_mut::visit_block_mut(&mut transformer, &mut func.block);

    let sig = &func.sig;
    let vis = &func.vis;
    let attrs = &func.attrs;
    let stmts = &func.block.stmts;

    quote! {
        #(#attrs)*
        #vis #sig {
            #[allow(unused_imports)]
            use wasm::Signal;
            #(#stmts)*
        }
    }
}
