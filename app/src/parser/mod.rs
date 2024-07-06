use std::fmt::format;

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
        let mut result_string = String::new();
        let mut result = quote! {};

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

                        quote! {
                            #key #value
                        }
                    });

                    // class="foo" id="app" のような attribute を parse する
                    let mut attribute_string = String::new();
                    for attr in attributes {
                        let attr = attr.to_string();
                        let attr_parts: Vec<&str> = attr.split_whitespace().collect();
                        let key = attr_parts[0];
                        let value = attr_parts[1];
                        let attr_pair = format!(" {}={}", key, value);
                        attribute_string.push_str(&attr_pair);
                    }

                    let r;
                    if attribute_string.is_empty() {
                        r = format!("<{}>", name);
                    } else {
                        r = format!("<{}{}>", name, attribute_string);
                    }

                    r
                }
                Token::Close { name, close } => {
                    format!("</{}>", name)
                }
                Token::Text {
                    content,
                    start,
                    end,
                } => content,
                Token::Braced { block, span } => {
                    format!("{}", "ddd")
                }
            };

            result_string.push_str(&token);
            result = quote! {
                #result_string
            };
        }

        result
    }
}
