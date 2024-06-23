use std::collections::VecDeque;

use crate::{lexer::Lexer, token::Token};

pub fn tokenize(input: &str) -> VecDeque<Token> {
    let mut lexer = Lexer::new(input);
    let mut tokens = Vec::new();

    while let Some(token) = lexer.next_token() {
        tokens.push(token);
    }

    tokens.into()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_tokenize_heading() {
        let input = "# Title";
        let tokens = tokenize(input);
        assert_eq!(tokens.len(), 1);
        match tokens.get(0).unwrap() {
            Token::Heading { level, content } => {
                assert_eq!(*level, 1);
                assert_eq!(content, "Title");
            }
            _ => panic!("Unexpected token"),
        }
    }

    #[test]
    fn test_tokenize_heading2() {
        let input = "## Sub Title";
        let tokens = tokenize(input);
        assert_eq!(tokens.len(), 1);
        match tokens.get(0).unwrap() {
            Token::Heading { level, content } => {
                assert_eq!(*level, 2);
                assert_eq!(content, "Sub Title");
            }
            _ => panic!("Unexpected token"),
        }
    }

    #[test]
    fn test_tokenize_paragraph() {
        let input = "Normal";
        let tokens = tokenize(input);
        assert_eq!(tokens.len(), 1);
        match tokens.get(0).unwrap() {
            Token::Paragraph(content) => {
                assert_eq!(content, "Normal");
            }
            _ => panic!("Unexpected token"),
        }
    }

    #[test]
    fn test_list() {
        let input = "* Item 1\n";
        let tokens = tokenize(input);
        assert_eq!(tokens.len(), 1);
        println!("{:?}", tokens);
        match tokens.get(0).unwrap() {
            Token::ListItem(content) => {
                assert_eq!(content.len(), 1);
                assert_eq!(content[0], Token::Text("Item 1".to_string()));
            }
            _ => panic!("Unexpected token"),
        }
    }

    // #[test]
    // fn test_ordered_list() {
    //     let input = "1. Item 1\n";
    //     let tokens = tokenize(input);
    //     assert_eq!(tokens.len(), 1);
    //     match tokens.get(0).unwrap() {
    //         Token::OrderedList(items) => {
    //             assert_eq!(items.len(), 1);
    //             assert_eq!(items[0], "Item 1");
    //         }
    //         _ => panic!("Unexpected token"),
    //     }
    // }

    #[test]
    fn test_bold() {
        let input = "**Bold text**";
        let tokens = tokenize(input);
        assert_eq!(tokens.len(), 1);
        match tokens.get(0).unwrap() {
            Token::Bold(content) => {
                assert_eq!(content, "Bold text");
            }
            _ => panic!("Unexpected token"),
        }
    }

    #[test]
    fn test_italic() {
        let input = "*Italic text*";
        let tokens = tokenize(input);
        assert_eq!(tokens.len(), 1);
        match tokens.get(0).unwrap() {
            Token::Italic(content) => {
                assert_eq!(content, "Italic text");
            }
            _ => panic!("Unexpected token"),
        }
    }

    #[test]
    fn test_link() {
        let input = "[Link text](https://example.com)";
        let tokens = tokenize(input);
        assert_eq!(tokens.len(), 1);
        match tokens.get(0).unwrap() {
            Token::Link { text, url } => {
                assert_eq!(text, "Link text");
                assert_eq!(url, "https://example.com");
            }
            _ => panic!("Unexpected token"),
        }
    }

    #[test]
    fn test_code_block() {
        let input = "```rust\nfn main() {\n    println!(\"Hello, world!\");\n}\n```";
        let tokens = tokenize(input);
        assert_eq!(tokens.len(), 1);
        match tokens.get(0).unwrap() {
            Token::CodeBlock { language, content } => {
                assert_eq!(language, "rust");
                assert_eq!(
                    content,
                    "fn main() {\n    println!(\"Hello, world!\");\n}\n"
                );
            }
            _ => panic!("Unexpected token"),
        }
    }

    #[test]
    fn test_inline_code() {
        let input = "`let x = 42;`";
        let tokens = tokenize(input);
        assert_eq!(tokens.len(), 1);
        match tokens.get(0).unwrap() {
            Token::InlineCode(content) => {
                assert_eq!(content, "let x = 42;");
            }
            _ => panic!("Unexpected token"),
        }
    }

    #[test]
    fn test_block_quote() {
        let input = "> This is a block quote.";
        let tokens = tokenize(input);
        assert_eq!(tokens.len(), 1);
        match tokens.get(0).unwrap() {
            Token::BlockQuote(content) => {
                assert_eq!(content, "This is a block quote.");
            }
            _ => panic!("Unexpected token"),
        }
    }

    #[test]
    fn test_image() {
        let input = "![Alt text](https://example.com/image.jpg)";
        let tokens = tokenize(input);
        assert_eq!(tokens.len(), 1);
        match tokens.get(0).unwrap() {
            Token::Image { src, alt } => {
                assert_eq!(src, "https://example.com/image.jpg");
                assert_eq!(alt, "Alt text");
            }
            _ => panic!("Unexpected token"),
        }
    }

    #[test]
    fn test_tokenize_link_card() {
        let input = "@og[https://example.com]";
        let tokens = tokenize(input);
        println!("{:?}", tokens);
        assert_eq!(tokens.len(), 1);
        match tokens.get(0).unwrap() {
            Token::LinkCard(content) => {
                assert_eq!(content, "https://example.com");
            }
            _ => panic!("Unexpected token"),
        }
    }

    #[test]
    fn test_tokenize_twitter() {
        let input = "@twitter[https://twitter.com/foo/status/11111111]";
        let tokens = tokenize(input);
        println!("{:?}", tokens);
        assert_eq!(tokens.len(), 1);
        match tokens.get(0).unwrap() {
            Token::Twitter(content) => {
                assert_eq!(content, "https://twitter.com/foo/status/11111111");
            }
            _ => panic!("Unexpected token"),
        }
    }

    #[test]
    fn test_tokenize() {
        let input = r#"
# Title
## Subtitle
### Sub-subtitle
* Item 1
* Item 2
* Item 3
Normal text here.
"#;
        let tokens = tokenize(input);
        assert_eq!(tokens.len(), 7);
    }
}
