use quote::{quote, quote_each_token};

use crate::Token;

pub(crate) struct Parser {
    // tokens: Vec<proc_macro2::TokenStream>,
    // current_index: usize,
    // parent: Vec<(usize, Ident)>,
}

/// html をパースして TokenStream に変換する
/// TODO: wasm で client rendering に対応する
/// MEMO: いまのところは SSG 部分にのみ対応
impl Parser {
    pub fn new() -> Self {
        Parser {
            // tokens: Vec::new(),
            // current_index: 0,
            // parent: Vec::new(),
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
        let mut result = quote! {};

        while let Some(token) = tokens.next() {
            match token {
                Token::Open {
                    name,
                    attributes,
                    open,
                    close,
                } => {
                    let mut attributes = attributes.into_iter();
                    let mut attrs = quote! {};

                    while let Some(attr) = attributes.next() {
                        let key = attr.key;
                        let value = attr.value;
                        attrs = quote! { #attrs #key: #value, };
                    }

                    result = quote! {
                        #result
                        let #name = Element::new(#name, {
                            #attrs
                        });
                    };
                }
                Token::Close { name, close } => {
                    result = quote! {
                        #result
                        #name.close();
                    };
                }
                Token::Text {
                    content,
                    start,
                    end,
                } => {
                    result = quote! {
                        #result
                        quote! { #content };
                    };
                }
                Token::Braced { block, span } => {
                    result = quote! {
                        #result
                        #block
                    };
                }
            }
        }

        println!("{:?}", result);

        result
    }
}
