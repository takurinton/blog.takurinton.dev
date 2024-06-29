use crate::token::Token;

pub struct Lexer<'a> {
    input: &'a str,
    position: usize,
    read_position: usize,
    ch: Option<char>,
}

impl<'a> Lexer<'a> {
    pub fn new(input: &'a str) -> Self {
        let mut lexer = Lexer {
            input,
            position: 0,
            read_position: 0,
            ch: None,
        };
        lexer.read_char();
        lexer
    }

    fn read_char(&mut self) {
        self.ch = if self.read_position >= self.input.len() {
            None
        } else {
            Some(self.input[self.read_position..].chars().next().unwrap())
        };
        self.position = self.read_position;
        self.read_position += self.ch.map_or(1, |ch| ch.len_utf8());
    }

    fn peek_char(&self) -> Option<char> {
        if self.read_position >= self.input.len() {
            None
        } else {
            Some(self.input[self.read_position..].chars().next().unwrap())
        }
    }

    pub fn next_token(&mut self) -> Option<Token> {
        self.skip_whitespace();

        match self.ch {
            Some('#') => Some(self.read_heading()),
            Some('*') => {
                if self.peek_char() == Some(' ') {
                    Some(self.read_list())
                } else {
                    Some(self.read_italic_or_bold())
                }
            }
            Some('[') => Some(self.read_link()),
            Some('-') => {
                if self.peek_char() == Some(' ') {
                    Some(self.read_list())
                } else {
                    Some(self.read_text())
                }
            }
            Some('`') => Some(self.read_code_block_or_inline_code()),
            Some('>') => Some(self.read_quote()),
            Some('!') => {
                if self.peek_char() == Some('[') {
                    Some(self.read_image())
                } else {
                    Some(self.read_text())
                }
            }
            // Some('1') => {
            //     if self.peek_char() == Some('.') {
            //         Some(self.read_ordered_list())
            //     } else {
            //         Some(self.read_text())
            //     }
            // }
            Some(' ') => {
                if self.peek_char() == Some(' ') {
                    Some(self.read_break())
                } else {
                    Some(self.read_text())
                }
            }

            // ここから下はカスタムのシンタックス
            Some('@') => {
                // @og[URL] の形式かどうかを確認
                if self.peek_char() == Some('o') {
                    Some(self.read_link_card())
                } else if self.peek_char() == Some('t') {
                    Some(self.read_twitter())
                } else {
                    Some(self.read_text())
                }
            }
            Some(_) => Some(self.read_text()),
            None => None,
        }
    }

    fn read_heading(&mut self) -> Token {
        let mut level = 0;
        while let Some('#') = self.ch {
            level += 1;
            self.read_char();
        }

        self.skip_whitespace();

        let start = self.position;
        while let Some(ch) = self.ch {
            if ch == '\n' {
                break;
            }
            self.read_char();
        }
        Token::Heading {
            level,
            content: self.input[start..self.position].to_string(),
        }
    }

    fn read_italic_or_bold(&mut self) -> Token {
        if self.peek_char() == Some('*') {
            // Consume the second '*'
            self.read_char();
            self.read_char();
            let content_start = self.position;
            while let Some(ch) = self.ch {
                if ch == '*' && self.peek_char() == Some('*') {
                    break;
                }
                self.read_char();
            }
            let token = Token::Bold(self.input[content_start..self.position].to_string());
            self.read_char();
            self.read_char();

            token
        } else {
            self.read_char();
            let content_start = self.position;
            while let Some(ch) = self.ch {
                if ch == '*' {
                    break;
                }
                self.read_char();
            }

            let token = Token::Italic(self.input[content_start..self.position].to_string());

            self.read_char();

            token
        }
    }

    fn read_list(&mut self) -> Token {
        self.read_char();
        self.read_char();
        let mut tokens = vec![];

        // - [link](https://example.com) であれば ListItem(Token::Link) になる
        if self.ch == Some('[') {
            tokens.push(self.read_link());
        } else {
            let start = self.position;
            while let Some(ch) = self.ch {
                if ch == '\n' {
                    break;
                }
                self.read_char();
            }
            tokens.push(Token::Text(self.input[start..self.position].to_string()));
        }

        Token::ListItem(tokens)
    }

    fn read_link(&mut self) -> Token {
        self.read_char();

        let start = self.position;
        while let Some(ch) = self.ch {
            if ch == ']' {
                break;
            }
            self.read_char();
        }

        let text = self.input[start..self.position].to_string();

        // Skip the closing ']' and opening '('
        self.read_char();
        self.read_char();

        let link_start = self.position;
        while let Some(ch) = self.ch {
            if ch == ')' {
                break;
            }
            self.read_char();
        }

        let url = self.input[link_start..self.position].to_string();

        // Skip the closing ')'
        self.read_char();

        Token::Link {
            text: text,
            url: url,
        }
    }

    fn read_code_block_or_inline_code(&mut self) -> Token {
        if self.peek_char() == Some('`') {
            self.read_code_block()
        } else {
            self.read_inline_code()
        }
    }

    fn read_code_block(&mut self) -> Token {
        // ```
        self.read_char();
        self.read_char();
        self.read_char();

        let start = self.position;
        while let Some(ch) = self.ch {
            if ch == '\n' {
                break;
            }
            self.read_char();
        }

        let language = self.input[start..self.position].to_string();

        // \n
        self.read_char();

        let start = self.position;
        while let Some(ch) = self.ch {
            if ch == '`' && self.peek_char() == Some('`') && self.peek_char() == Some('`') {
                break;
            }
            self.read_char();
        }

        let content = self.input[start..self.position].to_string();

        self.read_char();
        self.read_char();
        self.read_char();

        Token::CodeBlock {
            language: language,
            content: content,
        }
    }

    fn read_inline_code(&mut self) -> Token {
        // `
        self.read_char();

        let start = self.position;
        while let Some(ch) = self.ch {
            if ch == '`' {
                break;
            }
            self.read_char();
        }

        let content = self.input[start..self.position].to_string();

        // `
        self.read_char();

        Token::InlineCode(content)
    }

    fn read_quote(&mut self) -> Token {
        self.read_char();
        self.read_char();
        let start = self.position;
        while let Some(ch) = self.ch {
            if ch == '\n' {
                break;
            }
            self.read_char();
        }
        Token::BlockQuote(self.input[start..self.position].to_string())
    }

    fn read_image(&mut self) -> Token {
        self.read_char();
        self.read_char();

        let start = self.position;
        while let Some(ch) = self.ch {
            if ch == ']' {
                break;
            }
            self.read_char();
        }

        let alt = self.input[start..self.position].to_string();

        // Skip the closing ']' and opening '('
        self.read_char();
        self.read_char();

        let link_start = self.position;
        while let Some(ch) = self.ch {
            if ch == ')' {
                break;
            }
            self.read_char();
        }

        let src = self.input[link_start..self.position].to_string();

        // Skip the closing ')'
        self.read_char();

        Token::Image { src, alt }
    }

    fn read_break(&mut self) -> Token {
        self.read_char();
        self.read_char();
        Token::Break
    }

    fn read_text(&mut self) -> Token {
        let start = self.position;
        while let Some(ch) = self.ch {
            if ch == '\n' {
                break;
            }
            self.read_char();
        }
        Token::Paragraph(self.input[start..self.position].to_string())
    }

    // fn read_ordered_list(&mut self) -> Token {}

    fn read_link_card(&mut self) -> Token {
        let content = self.input[self.position..].to_string();
        // @og[URL] で表現されるカスタムシンタックス
        self.read_char();
        self.read_char();

        if self.peek_char() != Some('[') {
            return Token::Paragraph(content);
        }

        self.read_char();
        self.read_char();

        let start = self.position;
        while let Some(ch) = self.ch {
            if ch == ']' {
                break;
            }
            self.read_char();
        }

        let url = self.input[start..self.position].to_string();

        // ]
        self.read_char();

        Token::LinkCard(url)
    }

    // @twitter[URL] で表現されるカスタムシンタックス
    fn read_twitter(&mut self) -> Token {
        let content = self.input[self.position..].to_string();
        // 多少強引だけど、twitter の文字数(7文字)をスキップする
        self.read_char();
        self.read_char();
        self.read_char();
        self.read_char();
        self.read_char();
        self.read_char();
        self.read_char();

        if self.peek_char() != Some('[') {
            return Token::Paragraph(content);
        }

        self.read_char();
        self.read_char();

        let start = self.position;
        while let Some(ch) = self.ch {
            if ch == ']' {
                break;
            }
            self.read_char();
        }

        let url = self.input[start..self.position].to_string();

        // ]
        self.read_char();

        Token::Twitter(url)
    }

    fn skip_whitespace(&mut self) {
        while let Some(ch) = self.ch {
            if !ch.is_whitespace() {
                break;
            }
            self.read_char();
        }
    }
}

#[cfg(test)]
mod tests {
    use std::vec;

    use super::*;

    #[test]
    fn test_next_token() {
        let input = "# Title\n";
        let mut lexer = Lexer::new(input);
        let token = lexer.next_token();
        assert_eq!(
            token,
            Some(Token::Heading {
                level: 1,
                content: "Title".to_string()
            })
        );
    }

    #[test]
    fn test_next_token_bold() {
        let input = "**Bold**\n";
        let mut lexer = Lexer::new(input);
        let token = lexer.next_token();
        assert_eq!(token, Some(Token::Bold("Bold".to_string())));
    }

    #[test]
    fn test_next_token_italic() {
        let input = "*Italic*\n";
        let mut lexer = Lexer::new(input);
        let token = lexer.next_token();
        assert_eq!(token, Some(Token::Italic("Italic".to_string())));
    }

    #[test]
    fn test_next_token_link() {
        let input = "[Link](https://example.com)\n";
        let mut lexer = Lexer::new(input);
        let token = lexer.next_token();
        assert_eq!(
            token,
            Some(Token::Link {
                text: "Link".to_string(),
                url: "https://example.com".to_string()
            })
        );
    }

    #[test]
    fn test_next_token_paragraph() {
        let input = "Normal text\n";
        let mut lexer = Lexer::new(input);
        let token = lexer.next_token();
        assert_eq!(token, Some(Token::Paragraph("Normal text".to_string())));
    }

    #[test]
    fn test_next_token_paragraph2() {
        let input = "SHA-256\n";
        let mut lexer = Lexer::new(input);
        let token = lexer.next_token();
        assert_eq!(token, Some(Token::Paragraph("SHA-256".to_string())));
    }

    #[test]
    fn test_next_token_multiple() {
        let input = "# Title\n**Bold**\n*Italic*\n[Link](https://example.com)\n";
        let mut lexer = Lexer::new(input);
        let token = lexer.next_token();
        assert_eq!(
            token,
            Some(Token::Heading {
                level: 1,
                content: "Title".to_string()
            })
        );
        let token = lexer.next_token();
        assert_eq!(token, Some(Token::Bold("Bold".to_string())));
        let token = lexer.next_token();
        assert_eq!(token, Some(Token::Italic("Italic".to_string())));
        let token = lexer.next_token();
        assert_eq!(
            token,
            Some(Token::Link {
                text: "Link".to_string(),
                url: "https://example.com".to_string()
            })
        );
    }

    #[test]
    fn test_next_token_whitespace() {
        let input = "  \n# Title\n  \n";
        let mut lexer = Lexer::new(input);
        let token = lexer.next_token();
        assert_eq!(
            token,
            Some(Token::Heading {
                level: 1,
                content: "Title".to_string()
            })
        );
    }

    #[test]
    fn test_next_token_empty() {
        let input = "";
        let mut lexer = Lexer::new(input);
        let token = lexer.next_token();
        assert_eq!(token, None);
    }

    #[test]
    fn test_next_token_code_block() {
        let input = "```rust\nfn main() {\n    println!(\"Hello, world!\");\n}\n```\n";
        let mut lexer = Lexer::new(input);
        let token = lexer.next_token();
        assert_eq!(
            token,
            Some(Token::CodeBlock {
                language: "rust".to_string(),
                content: "fn main() {\n    println!(\"Hello, world!\");\n}\n".to_string()
            })
        );
    }

    #[test]
    fn test_next_token_list() {
        let input = "* Item 1\n";
        let mut lexer = Lexer::new(input);
        let token = lexer.next_token();
        assert_eq!(
            token,
            Some(Token::ListItem(vec![Token::Text("Item 1".to_string())]))
        );
    }

    #[test]
    fn test_next_token_list_with_link() {
        let input = "* [Link](https://example.com)\n";
        let mut lexer = Lexer::new(input);
        let token = lexer.next_token();
        assert_eq!(
            token,
            Some(Token::ListItem(vec![Token::Link {
                text: "Link".to_string(),
                url: "https://example.com".to_string()
            }]))
        );
    }

    #[test]
    fn test_next_token_quote() {
        let input = "> Quote\n";
        let mut lexer = Lexer::new(input);
        let token = lexer.next_token();
        assert_eq!(token, Some(Token::BlockQuote("Quote".to_string())));
    }

    #[test]
    fn test_next_token_image() {
        let input = "![Alt text](https://example.com/image.png)\n";
        let mut lexer = Lexer::new(input);
        let token = lexer.next_token();
        assert_eq!(
            token,
            Some(Token::Image {
                src: "https://example.com/image.png".to_string(),
                alt: "Alt text".to_string()
            })
        );
    }

    #[test]
    fn test_next_token_link_card() {
        let input = "@og[https://example.com]\n";
        let mut lexer = Lexer::new(input);
        let token = lexer.next_token();
        assert_eq!(
            token,
            Some(Token::LinkCard("https://example.com".to_string()))
        );
    }

    #[test]
    fn test_next_token_twitter() {
        let input = "@twitter[https://example.com]\n";
        let mut lexer = Lexer::new(input);
        let token = lexer.next_token();
        assert_eq!(
            token,
            Some(Token::Twitter("https://example.com".to_string()))
        );
    }

    // #[test]
    // fn test_next_token_ordered_list() {
    //     let input = "1. Item 1\n";
    //     let mut lexer = Lexer::new(input);
    //     let token = lexer.next_token();
    //     assert_eq!(token, Some(Token::ListItem("Item 1".to_string())));
    // }

    #[test]
    fn test_next_token_list_multiple() {
        let input = "* Item 1\n* Item 2\n";
        let mut lexer = Lexer::new(input);
        let token = lexer.next_token();
        assert_eq!(
            token,
            Some(Token::ListItem(vec![Token::Text("Item 1".to_string())]))
        );
        let token = lexer.next_token();
        assert_eq!(
            token,
            Some(Token::ListItem(vec![Token::Text("Item 2".to_string())]))
        );
    }
}
