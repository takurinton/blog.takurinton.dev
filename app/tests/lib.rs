use markdown::markdown_to_html;

#[cfg(test)]
mod tests {
    use app::render;

    use super::*;

    #[test]
    fn test_render() {
        let html = markdown_to_html("# hello world");
        let input = render! {
            <div></div>
        }
        .to_string();

        let expected = "<div class=\"foo\" id=\"app\"><div><h1>hello world</h1></div><div><p>hoge</p></div></div>";
        assert_eq!(input, expected);
    }
}
