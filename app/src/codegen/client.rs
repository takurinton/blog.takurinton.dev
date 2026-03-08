use proc_macro2::{Ident, Span, TokenStream};
use quote::{format_ident, quote};

use crate::tokenizer::{Attribute, RenderToken};

/// Client コード生成: トークン列 → imperative DOM 操作コード
pub(crate) fn generate(tokens: Vec<RenderToken>) -> TokenStream {
    let mut stmts = quote! {};
    let mut el_counter: usize = 0;
    let mut text_counter: usize = 0;
    // Stack of element variable names
    let mut stack: Vec<Ident> = Vec::new();

    for t in tokens {
        match t {
            RenderToken::Open {
                name, attributes, ..
            } => {
                let tag = name.to_string();
                let el_var = format_ident!("__el_{}", el_counter);
                el_counter += 1;

                stmts = quote! {
                    #stmts
                    let #el_var = __doc.create_element(#tag).unwrap();
                };

                for Attribute { key, value, .. } in attributes {
                    let k = key.to_string();
                    let v = value;
                    stmts = quote! {
                        #stmts
                        #el_var.set_attribute(#k, &::std::string::ToString::to_string(&(#v))).unwrap();
                    };
                }

                // append to parent if exists
                if let Some(parent) = stack.last() {
                    stmts = quote! {
                        #stmts
                        #parent.append_child(&#el_var).unwrap();
                    };
                }

                stack.push(el_var);
            }

            RenderToken::Close { .. } => {
                stack.pop();
            }

            RenderToken::Text { content, .. } => {
                if content.is_empty() {
                    continue;
                }
                let t_var = format_ident!("__t_{}", text_counter);
                text_counter += 1;

                stmts = quote! {
                    #stmts
                    let #t_var = __doc.create_text_node(#content);
                };

                if let Some(parent) = stack.last() {
                    stmts = quote! {
                        #stmts
                        #parent.append_child(&#t_var).unwrap();
                    };
                }
            }

            RenderToken::Braced { block, .. } => {
                let t_var = format_ident!("__t_{}", text_counter);
                text_counter += 1;

                stmts = quote! {
                    #stmts
                    let #t_var = __doc.create_text_node("");
                    ::wasm::Bindable::bind(#block, &#t_var);
                };

                if let Some(parent) = stack.last() {
                    stmts = quote! {
                        #stmts
                        #parent.append_child(&#t_var).unwrap();
                    };
                }
            }
        }
    }

    // Return the root element (__el_0)
    let root = format_ident!("__el_0");
    quote! {{
        let __doc = ::web_sys::window().unwrap().document().unwrap();
        #stmts
        #root
    }}
}

#[cfg(test)]
mod tests {
    use super::*;
    use proc_macro2::Span;
    use syn::parse_quote;

    fn make_open(tag: &str, attrs: Vec<(&str, &str)>) -> RenderToken {
        let attributes = attrs
            .into_iter()
            .map(|(k, v)| {
                let key: TokenStream = k.parse().unwrap();
                let value: syn::Expr = parse_quote! { #v };
                Attribute {
                    key,
                    value,
                    span: Span::call_site(),
                }
            })
            .collect();
        RenderToken::Open {
            name: Ident::new(tag, Span::call_site()),
            open: Span::call_site(),
            close: Span::call_site(),
            attributes,
        }
    }

    fn make_close(tag: &str) -> RenderToken {
        RenderToken::Close {
            name: Ident::new(tag, Span::call_site()),
            close: Span::call_site(),
        }
    }

    fn make_text(content: &str) -> RenderToken {
        RenderToken::Text {
            content: content.to_string(),
            start: None,
            end: None,
        }
    }

    #[test]
    fn test_generate_creates_element() {
        let tokens = vec![make_open("div", vec![]), make_close("div")];
        let output = generate(tokens).to_string();
        assert!(output.contains("create_element"));
        assert!(output.contains("\"div\""));
    }

    #[test]
    fn test_generate_sets_attribute() {
        let tokens = vec![make_open("div", vec![("class", "foo")]), make_close("div")];
        let output = generate(tokens).to_string();
        assert!(output.contains("set_attribute"));
        assert!(output.contains("\"class\""));
    }

    #[test]
    fn test_generate_creates_text_node() {
        let tokens = vec![
            make_open("div", vec![]),
            make_text("hello"),
            make_close("div"),
        ];
        let output = generate(tokens).to_string();
        assert!(output.contains("create_text_node"));
        assert!(output.contains("\"hello\""));
    }
}
