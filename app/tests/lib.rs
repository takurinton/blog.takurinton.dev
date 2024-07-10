use markdown::markdown_to_html;

#[cfg(test)]
mod tests {
    use app::render;

    use super::*;

    #[test]
    fn test_render_brace() {
        let html = markdown_to_html("# hello world");
        assert_eq!(render!({ html }).to_string(), "<h1>hello world</h1>\n");
    }

    #[test]
    fn test_render_text() {
        assert_eq!(
            render! {
                foo
            }
            .to_string(),
            "foo"
        );
    }

    #[test]
    fn test_render_tag() {
        assert_eq!(render!(<div></div>).to_string(), "<div></div>");
    }

    #[test]
    fn test_render_nested() {
        assert_eq!(
            render! {
                <div>
                    <h1>hello world</h1>
                </div>
            }
            .to_string(),
            "<div><h1>hello world</h1></div>"
        );
    }

    #[test]
    fn test_render_attribute() {
        assert_eq!(
            render!(<div class="foo"></div>).to_string(),
            "<div class=\"foo\"></div>"
        );
    }
}
