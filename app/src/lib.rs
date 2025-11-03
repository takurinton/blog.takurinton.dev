// src/lib.rs
extern crate proc_macro;

use proc_macro2::{Span, TokenStream, TokenTree};
use quote::{quote, ToTokens};
use syn::parse::{Parse, ParseStream};
use syn::spanned::Spanned;
use syn::token::Brace;
use syn::{braced, parse_macro_input, Expr, Ident, Result, Token};

/// 属性: key="value" / key={expr}
#[derive(Debug)]
struct Attribute {
    key: proc_macro2::TokenStream,
    value: Expr,
    span: Span,
}
impl Attribute {
    fn key_string(&self) -> String {
        self.key.to_string()
    }
    fn value_expr(&self) -> &Expr {
        &self.value
    }
}

/// レンダリング用トークン
#[derive(Debug)]
enum Token {
    Open {
        name: Ident,
        open: Span,
        close: Span,
        attributes: Vec<Attribute>,
    },
    Close {
        name: Ident,
        close: Span,
    },
    Text {
        content: String,
        start: Option<Span>,
        end: Option<Span>,
    },
    /// { expr }
    Braced {
        block: Expr,
        span: Span,
    },
}

/// マクロ入力を字句解析する Tokenizer
struct Tokenizer;
impl Tokenizer {
    fn new() -> Self {
        Tokenizer
    }

    // <div ...>
    fn open(self, input: &mut ParseStream, open: Span) -> Result<Token> {
        let name = input.parse::<Ident>()?;
        let attributes = self.parse_attributes(input)?;
        let close_tok = input.parse::<Token![>]>()?;
        let close = close_tok.span();
        Ok(Token::Open {
            name,
            attributes,
            open,
            close,
        })
    }

    // class="foo" id={bar} のような属性列
    // struct Attribute { key: proc_macro2::TokenStream, value: Expr, span: Span }
    fn parse_attributes(self, input: &mut ParseStream) -> Result<Vec<Attribute>> {
        let mut attributes = Vec::new();

        // '>' or '/>' の直前まで属性を読み続ける
        while !(input.peek(Token![>]) || input.peek(Token![/])) {
            // --- key: '=' に当たるまでを丸ごと収集 ---
            let mut key_ts = TokenStream::new();
            while !input.peek(Token![=]) {
                // 属性が無い（例えば直で '>'）ケースに備える
                if input.is_empty() || input.peek(Token![>]) || input.peek(Token![/]) {
                    // キーがない＝属性終端とみなして抜ける
                    break;
                }
                let tt: TokenTree = input.parse()?;
                key_ts.extend(Some(tt));
            }

            // キーが空なら（例: 直で '>'）属性読み取り終了
            if key_ts.is_empty() {
                break;
            }

            // '=' は必須
            input.parse::<Token![=]>()?;

            // --- value: 次の属性開始 or タグ終端まで ---
            let mut value_ts = TokenStream::new();
            loop {
                // `>`, `/>` で終了
                if input.peek(Token![>]) || input.peek(Token![/]) {
                    break;
                }
                // 次の属性キーの開始を "次トークンのさらに次が '=' になる" で検出
                if input.peek2(Token![=]) {
                    break;
                }
                let tt: TokenTree = input.parse()?;
                value_ts.extend(Some(tt));
            }

            let value = syn::parse2::<Expr>(value_ts)?;
            // span は厳密に取らなくても可。必要なら key_ts の最初の span を拾う
            attributes.push(Attribute {
                key: key_ts,
                value,
                span: Span::call_site(),
            });
        }

        Ok(attributes)
    }

    // </div>
    fn close(self, input: &mut ParseStream, close: Span) -> Result<Token> {
        input.parse::<Token![/]>()?;
        let name = input.parse::<Ident>()?;
        input.parse::<Token![>]>()?;
        Ok(Token::Close { name, close })
    }

    // 素のテキスト（< や { が来る手前まで）
    fn text(self, input: &mut ParseStream) -> Result<Token> {
        let mut content = String::new();
        let mut i = 0;
        let mut start = None;
        let mut end: Option<Span> = None;

        while !input.is_empty() {
            // peek でタグ開始 or 埋め込み開始なら終了
            if input.peek(Token![<]) || input.peek(Brace) {
                break;
            }

            let tt = input.parse::<TokenTree>()?;

            if i == 0 {
                start = Some(tt.span());
                end = Some(tt.span());
            } else {
                end = Some(tt.span());
            }

            // token を文字列化
            let piece = tt.to_string();

            // 前のトークンが識別子や文字列リテラル、次も識別子やリテラルの場合には空白を入れる
            // （例: hello world → "hello world"）
            if i > 0 {
                if let Some(last) = content.chars().last() {
                    // A-Za-z0-9 などの連続を空白で区切る
                    if last.is_ascii_alphanumeric()
                        && piece
                            .chars()
                            .next()
                            .map_or(false, |c| c.is_ascii_alphanumeric())
                    {
                        content.push(' ');
                    }
                }
            }

            content.push_str(&piece);
            i += 1;
        }

        Ok(Token::Text {
            content,
            start,
            end,
        })
    }

    // { expr }
    fn braced(self, input: &mut ParseStream) -> Result<Token> {
        let content;
        let brace_token = braced!(content in input);
        let block = content.parse::<Expr>()?;
        Ok(Token::Braced {
            block,
            span: brace_token.span.span(),
        })
    }
}

/// トップレベル：トークン列
#[derive(Debug)]
struct Render {
    tokens: Vec<Token>,
}
impl Parse for Render {
    fn parse(input: ParseStream) -> Result<Self> {
        let mut tokens = Vec::new();

        while !input.is_empty() {
            let token = input.parse::<Token>()?;
            tokens.push(token);
        }

        Ok(Render { tokens })
    }
}
impl Parse for Token {
    fn parse(input: ParseStream) -> Result<Self> {
        let mut input = input;
        let tokenizer = Tokenizer::new();

        if input.peek(Token![<]) {
            let open = input.parse::<Token![<]>()?;
            let span = open.span();

            if input.peek(Token![/]) {
                return tokenizer.close(&mut input, span);
            } else {
                return tokenizer.open(&mut input, span);
            }
        }

        if input.peek(Brace) {
            return tokenizer.braced(&mut input);
        }

        tokenizer.text(&mut input)
    }
}

/// トークン列 -> 文字列を積むコードに変換する
struct Parser;
impl Parser {
    pub fn new() -> Self {
        Parser
    }

    /// `tokens` を走査し、下記のコードを生成:
    /// {
    ///   let mut __s = String::new();
    ///   // ... push_str していく ...
    ///   __s
    /// }
    pub fn create_node(&mut self, tokens: Vec<Token>) -> proc_macro2::TokenStream {
        let mut out = quote! {};

        for t in tokens {
            match t {
                Token::Open {
                    name, attributes, ..
                } => {
                    let tag = name.to_string();
                    let mut attrs_code = quote! {};
                    for Attribute { key, value, .. } in attributes {
                        let k = key.to_string();
                        let v = value; // Expr
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

                Token::Close { name, .. } => {
                    let tag = name.to_string();
                    out = quote! {
                        #out
                        __s.push_str("</");
                        __s.push_str(#tag);
                        __s.push('>');
                    };
                }

                Token::Text { content, .. } => {
                    out = quote! {
                        #out
                        __s.push_str(#content);
                    };
                }

                Token::Braced { block, .. } => {
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
}

/// 例:
/// let foo = "hello";
/// render! { <div class="foo">{foo}</div> }  => "<div class=\"foo\">hello</div>"
#[proc_macro]
pub fn render(input: proc_macro::TokenStream) -> proc_macro::TokenStream {
    let parsed_input = parse_macro_input!(input as Render);
    let tokens = parsed_input.tokens;

    let mut p = Parser::new();
    let node = p.create_node(tokens);
    node.into()
}
