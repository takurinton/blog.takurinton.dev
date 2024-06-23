extern crate regex;

use regex::Regex;
use std::collections::HashMap;

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

pub mod generator;
pub mod lexer;
pub mod token;
pub mod tokenizer;

pub fn markdown_to_html(input: &str) -> String {
    let tokens = tokenizer::tokenize(input);
    generator::generate_html(tokens)
}
