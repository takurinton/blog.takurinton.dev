use markdown::markdown_to_html;

#[cfg(test)]
mod tests {
    use app::render_to_string;

    use super::*;

    #[test]
    fn test_render() {
        let html = markdown_to_html("# hello world");
        let input = render_to_string! {
            <div class="foo" id="app">
                <div>{html}</div>
                <div>
                    <h1>hello world</h1>
                </div>
            </div>
        };

        let expected = r#"<div><div>foo</div><div><h1>hello world</h1></div></div>"#.to_string();

        assert_eq!(input, expected);
    }
}
