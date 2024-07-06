use markdown::markdown_to_html;

#[cfg(test)]
mod tests {
    use app::render;

    use super::*;

    #[test]
    fn test_render() {
        let html = markdown_to_html("# hello world");
        let input = render! {
            <div class="foo" id="app">
                <div>{ html }</div>
                <div>
                    <h1>hello world</h1>
                </div>
            </div>
        };

        let expected = "\"<div class=\\\"foo\\\" id=\\\"app\\\"><div><h1>hello world</h1></div><div><h1>helloworld</h1></div></div>\"";
        assert_eq!(input, expected);
    }
}
