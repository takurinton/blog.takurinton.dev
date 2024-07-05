use proc_macro::Ident;
use quote::quote;

use crate::Token;

pub(crate) struct Parser {
    tokens: Vec<proc_macro2::TokenStream>,
    current_index: usize,
    parent: Vec<(usize, Ident)>,
}

/// html をパースして TokenStream に変換する
/// TODO: wasm で client rendering に対応する
/// MEMO: いまのところは SSG 部分にのみ対応
impl Parser {
    pub fn new() -> Self {
        Parser {
            tokens: Vec::new(),
            current_index: 0,
            parent: Vec::new(),
        }
    }

    // parse した tokens を詰め込む
    // pub fn tokenize(&mut self, tokens: Vec<Token>) {
    //     let length = tokens.len();
    //     for (index, token) in tokens.iter().enumerate() {
    //         let next_token = if index + 1 < length {
    //             Some(&tokens[index + 1])
    //         } else {
    //             None
    //         };

    //         self.push(token, next_token);
    //     }
    // }

    // fn push(&mut self, token: &Token, next_token: Option<&Token>) {
    //     match token {
    //         Token::Open {
    //             name, attributes, ..
    //         } => {}
    //         Token::Close { name, .. } => {}
    //         Token::Text { content, .. } => {}
    //         Token::Braced { block, .. } => {}
    //     };

    //     // self.tokens.push(quote! { #token });
    // }

    // 処理をして TokenStream を返す
    // pub fn end(&self) -> proc_macro2::TokenStream {
    //     quote! {}
    // }

    pub fn render_to_string(&self, tokens: Vec<Token>) -> proc_macro2::TokenStream {
        let mut tokens = tokens.into_iter();
        let mut result = quote! { String::new() };

        while let Some(token) = tokens.next() {
            // let next_token = tokens.next();
            // let next = match next_token {
            //     Some(token) => token,
            //     None => Token::Text {
            //         content: String::new(),
            //         start: None,
            //         end: None,
            //     },
            // };

            let token = match token {
                Token::Open {
                    name,
                    attributes,
                    open,
                    close,
                } => {
                    let attributes = attributes.into_iter().map(|attr| {
                        let key = attr.key;
                        let value = attr.value;
                        quote! { format!("{}={}", stringify!(#key), #value) }
                    });

                    quote! {
                        format!(
                            "<{} {}>",
                            stringify!(#name),
                            #(#attributes),*
                        )
                    }
                }
                Token::Close { name, close } => {
                    quote! { format!("</{}>", stringify!(#name)) }
                }
                Token::Text {
                    content,
                    start,
                    end,
                } => {
                    quote! { format!("{}", #content) }
                }
                Token::Braced { block, span } => {
                    quote! { format!("{}", #block) }
                }
            };

            result = quote! {
                format!("{}{}", #result, #token)
            };
        }

        result
    }
}
