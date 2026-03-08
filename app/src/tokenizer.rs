use proc_macro2::{Span, TokenStream, TokenTree};
use syn::parse::{Parse, ParseStream};
use syn::spanned::Spanned;
use syn::token::Brace;
use syn::{braced, Expr, Ident, Result, Token};

/// 属性: key="value" / key={expr}
#[derive(Debug, Clone)]
pub(crate) struct Attribute {
    pub key: TokenStream,
    pub value: Expr,
    pub span: Span,
}
impl Attribute {
    pub fn key_string(&self) -> String {
        self.key.to_string()
    }
    pub fn value_expr(&self) -> &Expr {
        &self.value
    }
}

/// レンダリング用トークン
#[derive(Debug, Clone)]
pub(crate) enum RenderToken {
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
    fn open(self, input: &mut ParseStream, open: Span) -> Result<RenderToken> {
        let name = input.parse::<Ident>()?;
        let attributes = self.parse_attributes(input)?;
        let close_tok = input.parse::<Token![>]>()?;
        let close = close_tok.span();
        Ok(RenderToken::Open {
            name,
            attributes,
            open,
            close,
        })
    }

    // class="foo" id={bar} のような属性列
    fn parse_attributes(self, input: &mut ParseStream) -> Result<Vec<Attribute>> {
        let mut attributes = Vec::new();

        while !(input.peek(Token![>]) || input.peek(Token![/])) {
            let mut key_ts = TokenStream::new();
            while !input.peek(Token![=]) {
                if input.is_empty() || input.peek(Token![>]) || input.peek(Token![/]) {
                    break;
                }
                let tt: TokenTree = input.parse()?;
                key_ts.extend(Some(tt));
            }

            if key_ts.is_empty() {
                break;
            }

            input.parse::<Token![=]>()?;

            let mut value_ts = TokenStream::new();
            loop {
                if input.peek(Token![>]) || input.peek(Token![/]) {
                    break;
                }
                if input.peek2(Token![=]) {
                    break;
                }
                let tt: TokenTree = input.parse()?;
                value_ts.extend(Some(tt));
            }

            let value = syn::parse2::<Expr>(value_ts)?;
            attributes.push(Attribute {
                key: key_ts,
                value,
                span: Span::call_site(),
            });
        }

        Ok(attributes)
    }

    // </div>
    fn close(self, input: &mut ParseStream, close: Span) -> Result<RenderToken> {
        input.parse::<Token![/]>()?;
        let name = input.parse::<Ident>()?;
        input.parse::<Token![>]>()?;
        Ok(RenderToken::Close { name, close })
    }

    // 素のテキスト（< や { が来る手前まで）
    fn text(self, input: &mut ParseStream) -> Result<RenderToken> {
        let mut content = String::new();
        let mut i = 0;
        let mut start = None;
        let mut end: Option<Span> = None;

        while !input.is_empty() {
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

            let piece = tt.to_string();

            if i > 0 {
                if let Some(last) = content.chars().last() {
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

        Ok(RenderToken::Text {
            content,
            start,
            end,
        })
    }

    // { expr }
    fn braced(self, input: &mut ParseStream) -> Result<RenderToken> {
        let content;
        let brace_token = braced!(content in input);
        let block = content.parse::<Expr>()?;
        Ok(RenderToken::Braced {
            block,
            span: brace_token.span.span(),
        })
    }
}

/// トップレベル：トークン列
#[derive(Debug)]
pub(crate) struct Render {
    pub tokens: Vec<RenderToken>,
}
impl Parse for Render {
    fn parse(input: ParseStream) -> Result<Self> {
        let mut tokens = Vec::new();

        while !input.is_empty() {
            let token = input.parse::<RenderToken>()?;
            tokens.push(token);
        }

        Ok(Render { tokens })
    }
}
impl Parse for RenderToken {
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
