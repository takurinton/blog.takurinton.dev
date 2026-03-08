extern crate proc_macro;

mod codegen;
mod component;
mod tokenizer;

use quote::quote;
use syn::parse_macro_input;

#[proc_macro]
pub fn render(input: proc_macro::TokenStream) -> proc_macro::TokenStream {
    let parsed = parse_macro_input!(input as tokenizer::Render);
    let tokens = parsed.tokens;
    let ssr = codegen::ssr::generate(tokens.clone());
    let client = codegen::client::generate(tokens);
    quote! {{
        #[cfg(not(target_arch = "wasm32"))]
        { #ssr }
        #[cfg(target_arch = "wasm32")]
        { #client }
    }}
    .into()
}

#[proc_macro_attribute]
pub fn component(_attr: proc_macro::TokenStream, item: proc_macro::TokenStream) -> proc_macro::TokenStream {
    let func = parse_macro_input!(item as syn::ItemFn);
    component::transform(func).into()
}
