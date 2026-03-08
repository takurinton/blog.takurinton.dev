use proc_macro2::TokenStream;
use quote::quote;

use crate::tokenizer::{Attribute, RenderToken};

/// SSR コード生成: トークン列 → String を組み立てるコード
pub(crate) fn generate(tokens: Vec<RenderToken>) -> TokenStream {
    let mut out = quote! {};

    for t in tokens {
        match t {
            RenderToken::Open {
                name, attributes, ..
            } => {
                let tag = name.to_string();
                let mut attrs_code = quote! {};
                for Attribute { key, value, .. } in attributes {
                    let k = key.to_string();
                    let v = value;
                    attrs_code = quote! {
                        #attrs_code
                        __s.push(' ');
                        __s.push_str(#k);
                        __s.push_str("=\"");
                        __s.push_str(&::std::string::ToString::to_string(&(#v)));
                        __s.push('"');
                    };
                }

                out = quote! {
                    #out
                    __s.push('<');
                    __s.push_str(#tag);
                    #attrs_code
                    __s.push('>');
                };
            }

            RenderToken::Close { name, .. } => {
                let tag = name.to_string();
                out = quote! {
                    #out
                    __s.push_str("</");
                    __s.push_str(#tag);
                    __s.push('>');
                };
            }

            RenderToken::Text { content, .. } => {
                out = quote! {
                    #out
                    __s.push_str(#content);
                };
            }

            RenderToken::Braced { block, .. } => {
                out = quote! {
                    #out
                    __s.push_str(&::std::string::ToString::to_string(&(#block)));
                };
            }
        }
    }

    quote! {{
        let mut __s = ::std::string::String::new();
        #out
        __s
    }}
}
