use std::collections::VecDeque;

use crate::token::Token;

pub fn generate_html(tokens: VecDeque<Token>) -> String {
    let mut output = String::new();

    for token in tokens {
        match token {
            Token::Heading { level, content } => {
                output.push_str(&format!("<h{}>{}</h{}>\n", level, content, level));
            }
            Token::ListItem(content) => {
                for token in content {
                    match token {
                        Token::Text(text) => {
                            output.push_str(&format!("<li>{}</li>\n", text));
                        }
                        Token::Link { text, url } => {
                            output
                                .push_str(&format!("<li><a href=\"{}\">{}</a></li>\n", url, text));
                        }
                        _ => {}
                    }
                }
            }
            Token::Paragraph(content) => {
                output.push_str(&format!("<p>{}</p>\n", content));
            }
            Token::Bold(content) => {
                output.push_str(&format!("<strong>{}</strong>\n", content));
            }
            Token::Italic(content) => {
                output.push_str(&format!("<em>{}</em>\n", content));
            }
            Token::Link { text, url } => {
                output.push_str(&format!("<a href=\"{}\">{}</a>\n", url, text));
            }
            Token::CodeBlock { language, content } => {
                output.push_str(&format!(
                    "<pre><code class=\"language-{}\">{}</code></pre>\n",
                    language, content
                ));
            }
            Token::InlineCode(content) => {
                output.push_str(&format!("<code>{}</code>\n", content));
            }
            Token::BlockQuote(content) => {
                output.push_str(&format!("<blockquote>{}</blockquote>\n", content));
            }
            Token::Image { src, alt } => {
                output.push_str(&format!("<img src=\"{}\" alt=\"{}\" />\n", src, alt));
            }
            Token::Break => {
                output.push_str("<br />\n");
            }
            Token::Text(content) => {
                output.push_str(&format!("{}\n", content));
            }
            Token::LinkCard(content) => {
                output.push_str(&format!(
                    r#"<div class="og" id="{}">
                    <div data-url="{}"></div>
                    <div class="a">
                      <div class="left">
                          <img />
                      </div>
                      <div class="right">
                        <h1>loading...</h1>
                      </div>
                      </div>
                    </div>
                    "#,
                    content, content,
                ));
            }
            Token::Twitter(_) => {
                // output.push_str(&format!(
                //     "<blockquote class=\"twitter-tweet\" id=\"{}\"></blockquote>\n",
                //     content
                // ));
                output.push_str("<p>twitter card is not supported anymore...</p>\n")
            }
            _ => {}
        }
    }

    output
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_html_heading() {
        let tokens = VecDeque::from(vec![Token::Heading {
            level: 1,
            content: "Title".to_string(),
        }]);
        let html = generate_html(tokens);
        assert_eq!(html, "<h1>Title</h1>\n");
    }

    #[test]
    fn test_generate_html_list() {
        let tokens = VecDeque::from(vec![Token::ListItem(vec![Token::Text(
            "Item 1".to_string(),
        )])]);
        let html = generate_html(tokens);
        assert_eq!(html, "<li>Item 1</li>\n");
    }

    #[test]
    fn test_generate_html_paragraph() {
        let tokens = VecDeque::from(vec![Token::Paragraph("Normal text here.".to_string())]);
        let html = generate_html(tokens);
        assert_eq!(html, "<p>Normal text here.</p>\n");
    }

    #[test]
    fn test_generate_html_bold() {
        let tokens = VecDeque::from(vec![Token::Bold("Bold text".to_string())]);
        let html = generate_html(tokens);
        assert_eq!(html, "<strong>Bold text</strong>\n");
    }

    #[test]
    fn test_generate_html_italic() {
        let tokens = VecDeque::from(vec![Token::Italic("Italic text".to_string())]);
        let html = generate_html(tokens);
        assert_eq!(html, "<em>Italic text</em>\n");
    }

    #[test]
    fn test_generate_html_link() {
        let tokens = VecDeque::from(vec![Token::Link {
            text: "Link text".to_string(),
            url: "https://example.com".to_string(),
        }]);
        let html = generate_html(tokens);
        assert_eq!(html, "<a href=\"https://example.com\">Link text</a>\n");
    }

    #[test]
    fn test_generate_html_code_block() {
        let tokens = VecDeque::from(vec![Token::CodeBlock {
            language: "rust".to_string(),
            content: "fn main() {\n    println!(\"Hello, world!\");\n}\n".to_string(),
        }]);
        let html = generate_html(tokens);
        assert_eq!(html, "<pre><code class=\"language-rust\">fn main() {\n    println!(\"Hello, world!\");\n}\n</code></pre>\n");
    }

    #[test]
    fn test_generate_html_inline_code() {
        let tokens = VecDeque::from(vec![Token::InlineCode("let x = 42;".to_string())]);
        let html = generate_html(tokens);
        assert_eq!(html, "<code>let x = 42;</code>\n");
    }

    #[test]
    fn test_generate_html_block_quote() {
        let tokens = VecDeque::from(vec![Token::BlockQuote(
            "This is a block quote.".to_string(),
        )]);
        let html = generate_html(tokens);
        assert_eq!(html, "<blockquote>This is a block quote.</blockquote>\n");
    }

    #[test]
    fn test_generate_html_image() {
        let tokens = VecDeque::from(vec![Token::Image {
            src: "https://example.com/image.jpg".to_string(),
            alt: "Alt text".to_string(),
        }]);
        let html = generate_html(tokens);
        assert_eq!(
            html,
            "<img src=\"https://example.com/image.jpg\" alt=\"Alt text\" />\n"
        );
    }

    #[test]
    fn test_generate_html_link_card() {
        let tokens = VecDeque::from(vec![Token::LinkCard("https://example.com".to_string())]);
        let html = generate_html(tokens);
        assert_eq!(
            html,
            r#"<div class="og" id="https://example.com">
                    <div data-url="https://example.com"></div>
                    <div class="a">
                      <div class="left">
                          <img />
                      </div>
                      <div class="right">
                        <h1>loading...</h1>
                      </div>
                      </div>
                    </div>
                    "#
        );
    }

    #[test]
    fn test_generate_html_twitter() {
        let tokens = VecDeque::from(vec![Token::Twitter(
            "https://twitter.com/foo/status/11111111".to_string(),
        )]);
        let html = generate_html(tokens);
        assert_eq!(html, "<p>twitter card is not supported anymore...</p>\n");
    }

    #[test]
    fn test_generate_html() {
        let tokens = VecDeque::from(vec![
            Token::Heading {
                level: 1,
                content: "Title".to_string(),
            },
            Token::Heading {
                level: 2,
                content: "Subtitle".to_string(),
            },
            Token::Heading {
                level: 3,
                content: "Sub-subtitle".to_string(),
            },
            Token::ListItem(vec![
                Token::Text("Item 1".to_string()),
                Token::Text("Item 2".to_string()),
                Token::Text("Item 3".to_string()),
            ]),
            // Token::ListItem("Item 2".to_string()),
            // Token::ListItem("Item 3".to_string()),
            Token::Paragraph("Normal text here.".to_string()),
        ]);
        let html = generate_html(tokens);
        assert_eq!(
            html,
            "<h1>Title</h1>\n<h2>Subtitle</h2>\n<h3>Sub-subtitle</h3>\n<li>Item 1</li>\n<li>Item 2</li>\n<li>Item 3</li>\n<p>Normal text here.</p>\n"
        );
    }
}
