use proc_macro::TokenStream;
use quote::quote;

fn fnv1a_hash(s: &str) -> u32 {
    let mut hash: u32 = 2166136261;
    for byte in s.bytes() {
        hash ^= byte as u32;
        hash = hash.wrapping_mul(16777619);
    }
    hash
}

/// TokenStream から CSS テキストを抽出する。
/// 文字列リテラル形式 `css!("...")` ならそのまま値を取得（セレクタの空白が崩れない）。
/// トークン列形式 `css! { ... }` なら to_string() で変換（後方互換）。
fn extract_css_text(input: TokenStream) -> String {
    let input_clone = input.clone();
    if let Ok(lit) = syn::parse::<syn::LitStr>(input_clone) {
        lit.value()
    } else {
        input.to_string().trim().to_string()
    }
}

// ---------------------------------------------------------------------------
// CSS parser — ネスト構文（&, @media）を解析
// ---------------------------------------------------------------------------

struct ParsedCss {
    top_level: String,
    nested: Vec<(String, String)>, // (raw selector with &, properties)
    media: Vec<(String, String)>,  // (query, properties)
}

fn skip_whitespace(chars: &[char], pos: &mut usize) {
    while *pos < chars.len() && chars[*pos].is_whitespace() {
        *pos += 1;
    }
}

fn read_block(chars: &[char], pos: &mut usize) -> String {
    let start = *pos;
    let mut depth = 1;
    while *pos < chars.len() && depth > 0 {
        if chars[*pos] == '{' {
            depth += 1;
        }
        if chars[*pos] == '}' {
            depth -= 1;
        }
        if depth > 0 {
            *pos += 1;
        }
    }
    let content: String = chars[start..*pos].iter().collect();
    *pos += 1; // skip closing '}'
    content.trim().to_string()
}

fn starts_with_at(chars: &[char], pos: usize, target: &str) -> bool {
    let target_chars: Vec<char> = target.chars().collect();
    if pos + target_chars.len() > chars.len() {
        return false;
    }
    chars[pos..pos + target_chars.len()] == target_chars[..]
}

fn parse_css(input: &str) -> ParsedCss {
    let mut result = ParsedCss {
        top_level: String::new(),
        nested: vec![],
        media: vec![],
    };

    let chars: Vec<char> = input.chars().collect();
    let len = chars.len();
    let mut i = 0;

    while i < len {
        skip_whitespace(&chars, &mut i);
        if i >= len {
            break;
        }

        if chars[i] == '&' {
            // Nested selector block: &:hover { ... }, & h1 { ... }, & th, & td { ... }
            let selector_start = i;
            while i < len && chars[i] != '{' {
                i += 1;
            }
            let raw_selector: String = chars[selector_start..i].iter().collect();
            let raw_selector = raw_selector.trim().to_string();
            i += 1; // skip '{'
            let content = read_block(&chars, &mut i);
            result.nested.push((raw_selector, content));
        } else if starts_with_at(&chars, i, "@media") {
            // Media query block
            i += 6; // skip "@media"
            let query_start = i;
            while i < len && chars[i] != '{' {
                i += 1;
            }
            let query: String = chars[query_start..i].iter().collect();
            let query = query.trim().to_string();
            i += 1; // skip '{'
            let content = read_block(&chars, &mut i);
            result.media.push((query, content));
        } else {
            // Top-level property — read until ';'
            let start = i;
            loop {
                if i >= len {
                    let partial: String = chars[start..].iter().collect();
                    let partial = partial.trim();
                    if !partial.is_empty() {
                        result.top_level.push_str(partial);
                        result.top_level.push(' ');
                    }
                    break;
                }
                if chars[i] == ';' {
                    i += 1;
                    let prop: String = chars[start..i].iter().collect();
                    result.top_level.push_str(prop.trim());
                    result.top_level.push(' ');
                    break;
                }
                // Hit a nested block — flush partial top-level text
                if chars[i] == '&' || starts_with_at(&chars, i, "@media") {
                    let partial: String = chars[start..i].iter().collect();
                    let partial = partial.trim();
                    if !partial.is_empty() {
                        result.top_level.push_str(partial);
                        result.top_level.push(' ');
                    }
                    break;
                }
                i += 1;
            }
        }
    }

    result
}

fn generate_full_css(class_name: &str, parsed: &ParsedCss) -> String {
    let mut parts: Vec<String> = vec![];

    // Top-level properties → .css-xxx { ... }
    let top = parsed.top_level.trim();
    if !top.is_empty() {
        parts.push(format!(".{} {{ {} }}", class_name, top));
    }

    // Nested blocks — replace & with .css-xxx
    for (raw_selector, props) in &parsed.nested {
        let selector = raw_selector.replace("&", &format!(".{}", class_name));
        parts.push(format!("{} {{ {} }}", selector, props));
    }

    // Media blocks → @media query { .css-xxx { ... } }
    for (query, props) in &parsed.media {
        parts.push(format!(
            "@media {} {{ .{} {{ {} }} }}",
            query, class_name, props
        ));
    }

    parts.join("\n")
}

// ---------------------------------------------------------------------------
// css! マクロ実装
// ---------------------------------------------------------------------------

pub fn css_impl(input: TokenStream) -> TokenStream {
    let css_text = extract_css_text(input);

    let hash = fnv1a_hash(&css_text);
    let class_name = format!("css-{:06x}", hash & 0x00FF_FFFF);

    let parsed = parse_css(&css_text);
    let full_css = generate_full_css(&class_name, &parsed);

    quote! {{
        const __NAME: &'static str = #class_name;
        const __CSS: &'static str = #full_css;

        #[cfg(not(target_arch = "wasm32"))]
        crate::style::push(__NAME, __CSS);

        #[cfg(target_arch = "wasm32")]
        {
            use ::wasm_bindgen::JsCast as _;
            let __doc = ::web_sys::window().unwrap().document().unwrap();
            if __doc.get_element_by_id(__NAME).is_none() {
                let __el = __doc.create_element("style").unwrap();
                __el.set_id(__NAME);
                __el.set_inner_html(__CSS);
                if let Some(__head) = __doc.head() {
                    __head
                        .append_child(__el.unchecked_ref::<::web_sys::Node>())
                        .unwrap();
                }
            }
        }

        __NAME
    }}
    .into()
}

// ---------------------------------------------------------------------------
// global_css! マクロ実装 — CSS をそのまま注入（クラスでラップしない）
// ---------------------------------------------------------------------------

pub fn global_css_impl(input: TokenStream) -> TokenStream {
    let css_text = extract_css_text(input);

    let hash = fnv1a_hash(&css_text);
    let id = format!("gcss-{:06x}", hash & 0x00FF_FFFF);

    quote! {{
        const __NAME: &'static str = #id;
        const __CSS: &'static str = #css_text;

        #[cfg(not(target_arch = "wasm32"))]
        crate::style::push(__NAME, __CSS);

        #[cfg(target_arch = "wasm32")]
        {
            use ::wasm_bindgen::JsCast as _;
            let __doc = ::web_sys::window().unwrap().document().unwrap();
            if __doc.get_element_by_id(__NAME).is_none() {
                let __el = __doc.create_element("style").unwrap();
                __el.set_id(__NAME);
                __el.set_inner_html(__CSS);
                if let Some(__head) = __doc.head() {
                    __head
                        .append_child(__el.unchecked_ref::<::web_sys::Node>())
                        .unwrap();
                }
            }
        }
    }}
    .into()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn hash_is_stable() {
        let h1 = fnv1a_hash("color: red;");
        let h2 = fnv1a_hash("color: red;");
        assert_eq!(h1, h2);
    }

    #[test]
    fn different_css_different_hash() {
        let h1 = fnv1a_hash("color: red;");
        let h2 = fnv1a_hash("color: blue;");
        assert_ne!(h1, h2);
    }

    #[test]
    fn parse_top_level_only() {
        let parsed = parse_css("color: red; font-size: 16px;");
        assert_eq!(parsed.top_level.trim(), "color: red; font-size: 16px;");
        assert!(parsed.nested.is_empty());
        assert!(parsed.media.is_empty());
    }

    #[test]
    fn parse_nested_hover() {
        let parsed = parse_css("color: red; &:hover { color: blue; }");
        assert_eq!(parsed.top_level.trim(), "color: red;");
        assert_eq!(parsed.nested.len(), 1);
        assert_eq!(parsed.nested[0].0, "&:hover");
        assert_eq!(parsed.nested[0].1, "color: blue;");
    }

    #[test]
    fn parse_nested_descendant() {
        let parsed = parse_css("& h1 { font-size: 2rem; }");
        assert!(parsed.top_level.trim().is_empty());
        assert_eq!(parsed.nested.len(), 1);
        assert_eq!(parsed.nested[0].0, "& h1");
        assert_eq!(parsed.nested[0].1, "font-size: 2rem;");
    }

    #[test]
    fn parse_nested_multi_selector() {
        let parsed = parse_css("& th, & td { border: 1px solid #ccc; }");
        assert_eq!(parsed.nested.len(), 1);
        assert_eq!(parsed.nested[0].0, "& th, & td");
    }

    #[test]
    fn parse_media_query() {
        let parsed = parse_css("font-size: 16px; @media (max-width: 768px) { font-size: 12px; }");
        assert_eq!(parsed.top_level.trim(), "font-size: 16px;");
        assert_eq!(parsed.media.len(), 1);
        assert_eq!(parsed.media[0].0, "(max-width: 768px)");
        assert_eq!(parsed.media[0].1, "font-size: 12px;");
    }

    #[test]
    fn generate_with_nesting() {
        let parsed = parse_css("color: red; &:hover { color: blue; }");
        let css = generate_full_css("css-abc123", &parsed);
        assert!(css.contains(".css-abc123 { color: red; }"));
        assert!(css.contains(".css-abc123:hover { color: blue; }"));
    }

    #[test]
    fn generate_with_descendant() {
        let parsed = parse_css("& h1 { font-size: 2rem; }");
        let css = generate_full_css("css-abc123", &parsed);
        assert!(css.contains(".css-abc123 h1 { font-size: 2rem; }"));
    }

    #[test]
    fn generate_with_media() {
        let parsed = parse_css("font-size: 16px; @media (max-width: 768px) { font-size: 12px; }");
        let css = generate_full_css("css-abc123", &parsed);
        assert!(css.contains(".css-abc123 { font-size: 16px; }"));
        assert!(css.contains("@media (max-width: 768px) { .css-abc123 { font-size: 12px; } }"));
    }

    #[test]
    fn generate_multi_selector() {
        let parsed = parse_css("& th, & td { padding: 8px; }");
        let css = generate_full_css("css-abc123", &parsed);
        assert!(css.contains(".css-abc123 th, .css-abc123 td { padding: 8px; }"));
    }
}
