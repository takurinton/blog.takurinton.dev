extern crate regex;

use regex::Regex;
use std::collections::{HashMap, VecDeque};

#[derive(Debug)]
pub enum Token {
    Heading { level: usize, content: String },
    ListItem(String),
    OrderedList(Vec<String>),
    Bold(String),
    Italic(String),
    Link { text: String, url: String },
    CodeBlock { language: String, content: String },
    InlineCode(String),
    Paragraph(String),
    BlockQuote(String),
    Image { src: String, alt: String },

    // === ここから下はカスタムのシンタックス ===
    LinkCard(String),
    Twitter(String),
}

// MEMO: tokenizer に frontmatter があるのはおかしいので修正する
pub fn tokenize(input: &str) -> VecDeque<Token> {
    let front_matter_re = Regex::new(r"---\n([\s\S]*?)\n---\n\n([\s\S]*)").unwrap();
    let captures = match front_matter_re.captures(input) {
        Some(captures) => captures,
        None => {
            // 何もしない
            return VecDeque::new();
        }
    };

    let input = captures.get(2).unwrap().as_str().to_string();
    let mut tokens = VecDeque::new();

    let heading_regex = Regex::new(r"^(#{1,6}) (.+)$").unwrap();
    let list_item_regex = Regex::new(r"^\* (.+)$").unwrap();
    let ordered_list_regex = Regex::new(r"^\d+\. (.+)$").unwrap();
    let bold_regex = Regex::new(r"\*\*(.+?)\*\*").unwrap();
    let italic_regex = Regex::new(r"\*(.+?)\*").unwrap();
    let link_regex = Regex::new(r"\[(.+?)\]\((.+?)\)").unwrap();
    let code_block_start_regex = Regex::new(r"^```(\w*)").unwrap();
    let inline_code_regex = Regex::new(r"`(.+?)`").unwrap();
    let block_quote_regex = Regex::new(r"^> (.+)").unwrap();
    let image_regex = Regex::new(r"!\[(.+?)\]\((.+?)\)").unwrap();

    // === ここから下はカスタムのシンタックス ===
    let link_card = Regex::new(r"^@og\[(.*)\]").unwrap();
    // MEMO: Twitter card、もう正しく動く保証がないので廃止にしてもいいかもしれない
    let twitter = Regex::new(r"^@twitter\[(.*)\]").unwrap();

    let mut in_code_block = false;
    let mut code_block_content = String::new();
    let mut code_block_language = String::new();

    for line in input.lines() {
        if in_code_block {
            if code_block_start_regex.is_match(line) {
                tokens.push_back(Token::CodeBlock {
                    language: code_block_language.clone(),
                    content: code_block_content.clone(),
                });
                code_block_content.clear();
                code_block_language.clear();
                in_code_block = false;
            } else {
                code_block_content.push_str(line);
                code_block_content.push('\n');
            }
            continue;
        }

        if code_block_start_regex.is_match(line) {
            let captures = code_block_start_regex.captures(line).unwrap();
            code_block_language = captures.get(1).map_or("", |m| m.as_str()).to_string();
            in_code_block = true;
            continue;
        }

        if heading_regex.is_match(line) {
            let captures = heading_regex.captures(line).unwrap();
            let level = captures.get(1).unwrap().as_str().len();
            let content = captures.get(2).unwrap().as_str();
            tokens.push_back(Token::Heading {
                level,
                content: content.to_string(),
            });
        } else if image_regex.is_match(line) {
            let captures = image_regex.captures(line).unwrap();
            let alt = captures.get(1).unwrap().as_str();
            let src = captures.get(2).unwrap().as_str();
            tokens.push_back(Token::Image {
                src: src.to_string(),
                alt: alt.to_string(),
            });
        } else if list_item_regex.is_match(line) {
            let captures = list_item_regex.captures(line).unwrap();
            let content = captures.get(1).unwrap().as_str();
            tokens.push_back(Token::ListItem(content.to_string()));
        } else if ordered_list_regex.is_match(line) {
            let captures = ordered_list_regex.captures(line).unwrap();
            let content = captures.get(1).unwrap().as_str();
            tokens.push_back(Token::OrderedList(vec![content.to_string()]));
        } else if bold_regex.is_match(line) {
            let captures = bold_regex.captures(line).unwrap();
            let content = captures.get(1).unwrap().as_str();
            tokens.push_back(Token::Bold(content.to_string()));
        } else if italic_regex.is_match(line) {
            let captures = italic_regex.captures(line).unwrap();
            let content = captures.get(1).unwrap().as_str();
            tokens.push_back(Token::Italic(content.to_string()));
        } else if link_regex.is_match(line) {
            let captures = link_regex.captures(line).unwrap();
            let text = captures.get(1).unwrap().as_str();
            let url = captures.get(2).unwrap().as_str();
            tokens.push_back(Token::Link {
                text: text.to_string(),
                url: url.to_string(),
            });
        } else if inline_code_regex.is_match(line) {
            let captures = inline_code_regex.captures(line).unwrap();
            let content = captures.get(1).unwrap().as_str();
            tokens.push_back(Token::InlineCode(content.to_string()));
        } else if block_quote_regex.is_match(line) {
            let captures = block_quote_regex.captures(line).unwrap();
            let content = captures.get(1).unwrap().as_str();
            tokens.push_back(Token::BlockQuote(content.to_string()));
        } else if link_card.is_match(line) {
            let captures = link_card.captures(line).unwrap();
            let content = captures.get(1).unwrap().as_str();
            tokens.push_back(Token::LinkCard(content.to_string()))
        } else if twitter.is_match(line) {
            let captures = twitter.captures(line).unwrap();
            let content = captures.get(1).unwrap().as_str();
            tokens.push_back(Token::Twitter(content.to_string()))
        } else {
            tokens.push_back(Token::Paragraph(line.to_string()));
        }
    }

    if in_code_block {
        tokens.push_back(Token::CodeBlock {
            language: code_block_language,
            content: code_block_content,
        });
    }

    tokens
}

pub fn get_frontmatter(input: &str) -> HashMap<String, String> {
    let frontmatter_re = Regex::new(r"---\n([\s\S]*?)\n---\n\n([\s\S]*)").unwrap();
    let frontmatter_list =
        Regex::new(r"id:([\s\S]*)\ntitle:([\s\S]*)\ndescription:([\s\S]*)\ncreated_at:([\s\S]*)")
            .unwrap();

    let captures = match frontmatter_re.captures(input) {
        Some(captures) => captures,
        None => return HashMap::new(),
    };
    let frontmatter = captures.get(1).unwrap().as_str();

    let captures = match frontmatter_list.captures(frontmatter) {
        Some(captures) => captures,
        None => return HashMap::new(),
    };

    let id = captures.get(1).unwrap().as_str().trim().to_string();
    let title = captures.get(2).unwrap().as_str().trim().to_string();
    let description = captures.get(3).unwrap().as_str().trim().to_string();
    let created_at = captures.get(4).unwrap().as_str().trim().to_string();

    let mut map = HashMap::new();
    map.insert("id".to_string(), id);
    map.insert("title".to_string(), title);
    map.insert("description".to_string(), description);
    map.insert("created_at".to_string(), created_at);

    map
}

pub fn render_html(tokens: VecDeque<Token>) -> String {
    let mut output = String::new();

    for token in tokens {
        match token {
            Token::Heading { level, content } => {
                output.push_str(&format!("<h{}>{}</h{}>\n", level, content, level));
            }
            Token::ListItem(content) => {
                output.push_str(&format!("<li>{}</li>\n", content));
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
    fn test_tokenize_paragraph() {
        let input = "Normal text here.";
        let tokens = tokenize(input);
        assert_eq!(tokens.len(), 1);
        match tokens.get(0).unwrap() {
            Token::Paragraph(content) => {
                assert_eq!(content, "Normal text here.");
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
                assert_eq!(content, "Item 1");
            }
            _ => panic!("Unexpected token"),
        }
    }

    #[test]
    fn test_ordered_list() {
        let input = "1. Item 1\n";
        let tokens = tokenize(input);
        assert_eq!(tokens.len(), 1);
        match tokens.get(0).unwrap() {
            Token::OrderedList(items) => {
                assert_eq!(items.len(), 1);
                assert_eq!(items[0], "Item 1");
            }
            _ => panic!("Unexpected token"),
        }
    }

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
        assert_eq!(tokens.len(), 1);
        match tokens.get(0).unwrap() {
            Token::Twitter(content) => {
                assert_eq!(content, "https://twitter.com/foo/status/11111111");
            }
            _ => panic!("Unexpected token"),
        }
    }

    #[test]
    fn test_render_html_heading() {
        let tokens = VecDeque::from(vec![Token::Heading {
            level: 1,
            content: "Title".to_string(),
        }]);
        let html = render_html(tokens);
        assert_eq!(html, "<h1>Title</h1>\n");
    }

    #[test]
    fn test_render_html_list() {
        let tokens = VecDeque::from(vec![Token::ListItem("Item 1".to_string())]);
        let html = render_html(tokens);
        assert_eq!(html, "<li>Item 1</li>\n");
    }

    #[test]
    fn test_render_html_paragraph() {
        let tokens = VecDeque::from(vec![Token::Paragraph("Normal text here.".to_string())]);
        let html = render_html(tokens);
        assert_eq!(html, "<p>Normal text here.</p>\n");
    }

    #[test]
    fn test_render_html_bold() {
        let tokens = VecDeque::from(vec![Token::Bold("Bold text".to_string())]);
        let html = render_html(tokens);
        assert_eq!(html, "<strong>Bold text</strong>\n");
    }

    #[test]
    fn test_render_html_italic() {
        let tokens = VecDeque::from(vec![Token::Italic("Italic text".to_string())]);
        let html = render_html(tokens);
        assert_eq!(html, "<em>Italic text</em>\n");
    }

    #[test]
    fn test_render_html_link() {
        let tokens = VecDeque::from(vec![Token::Link {
            text: "Link text".to_string(),
            url: "https://example.com".to_string(),
        }]);
        let html = render_html(tokens);
        assert_eq!(html, "<a href=\"https://example.com\">Link text</a>\n");
    }

    #[test]
    fn test_render_html_code_block() {
        let tokens = VecDeque::from(vec![Token::CodeBlock {
            language: "rust".to_string(),
            content: "fn main() {\n    println!(\"Hello, world!\");\n}\n".to_string(),
        }]);
        let html = render_html(tokens);
        assert_eq!(html, "<pre><code class=\"language-rust\">fn main() {\n    println!(\"Hello, world!\");\n}\n</code></pre>\n");
    }

    #[test]
    fn test_render_html_inline_code() {
        let tokens = VecDeque::from(vec![Token::InlineCode("let x = 42;".to_string())]);
        let html = render_html(tokens);
        assert_eq!(html, "<code>let x = 42;</code>\n");
    }

    #[test]
    fn test_render_html_block_quote() {
        let tokens = VecDeque::from(vec![Token::BlockQuote(
            "This is a block quote.".to_string(),
        )]);
        let html = render_html(tokens);
        assert_eq!(html, "<blockquote>This is a block quote.</blockquote>\n");
    }

    #[test]
    fn test_render_html_image() {
        let tokens = VecDeque::from(vec![Token::Image {
            src: "https://example.com/image.jpg".to_string(),
            alt: "Alt text".to_string(),
        }]);
        let html = render_html(tokens);
        assert_eq!(
            html,
            "<img src=\"https://example.com/image.jpg\" alt=\"Alt text\" />\n"
        );
    }

    #[test]
    fn test_render_html_link_card() {
        let tokens = VecDeque::from(vec![Token::LinkCard("https://example.com".to_string())]);
        let html = render_html(tokens);
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
    fn test_render_html_twitter() {
        let tokens = VecDeque::from(vec![Token::Twitter(
            "https://twitter.com/foo/status/11111111".to_string(),
        )]);
        let html = render_html(tokens);
        assert_eq!(html, "<p>twitter card is not supported anymore...</p>\n");
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
        assert_eq!(tokens.len(), 8);
    }

    #[test]
    fn test_render_html() {
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
            Token::ListItem("Item 1".to_string()),
            Token::ListItem("Item 2".to_string()),
            Token::ListItem("Item 3".to_string()),
            Token::Paragraph("Normal text here.".to_string()),
        ]);
        let html = render_html(tokens);
        assert_eq!(
            html,
            "<h1>Title</h1>\n<h2>Subtitle</h2>\n<h3>Sub-subtitle</h3>\n<li>Item 1</li>\n<li>Item 2</li>\n<li>Item 3</li>\n<p>Normal text here.</p>\n"
        );
    }
}

pub fn html_to_string(html: String) -> String {
    // Markdownの一部の表現をプレーンテキストに変換
    let html_bold_italic_removed = html
        .replace("*", "")
        .replace("_", "")
        .replace("`", "")
        .replace("~", "");

    let html_tag_re = Regex::new(r"<[^>]*>").unwrap();
    let notag = html_tag_re
        .replace_all(&html_bold_italic_removed, "")
        .to_string();

    let break_to_space = notag.replace(&['\r', '\n'][..], " ");
    let space_re = Regex::new(r"\s+").unwrap();
    let space_removed = space_re.replace_all(&break_to_space, " ").to_string();

    // 特定のパターンを除去
    let twitter_re = Regex::new(r"@twitter\[.*?\]").unwrap();
    let without_twitter = twitter_re.replace_all(&space_removed, "").to_string();

    let og_re = Regex::new(r"@og\[.*?\]").unwrap();
    let result = og_re.replace_all(&without_twitter, "").to_string();

    result
}
