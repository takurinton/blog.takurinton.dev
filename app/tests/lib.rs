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

    #[test]
    fn test_description_pr() {
        let title = "hello";
        let created_at = "2024-01-01";
        let rendered_html = markdown_to_html("this is a paragraph.");
        let id = 1;
        let href = format!("/post/{}/index.html", id);

        assert_eq!(
        render! {
            <div class="post">
            <a class="post-title" href={href}>{title}</a>
                <p class="date">{created_at}</p>
                <p class="description">{markdown::html_to_string(rendered_html)}</p>
            </div>
        }
        .to_string(),
        "<div class=\"post\"><a class=\"post-title\" href=\"/post/1/index.html\">hello</a><p class=\"date\">2024-01-01</p><p class=\"description\">this is a paragraph. </p></div>"
    );
    }
}
