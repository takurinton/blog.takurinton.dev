use app::render;

use crate::components::document::{document, DocumentProps};
use crate::components::header::header;
use crate::routes::Route;

pub fn post_list_item(id: &str, title: &str, created_at: &str, description: &str) -> String {
    let href = Route::Post { id: id.to_string() }.url_path();
    let title = title.to_string();
    let created_at = created_at.to_string();
    let description = truncate_to_char_boundary(description, 300);
    render! {
        <div class="post">
            <a class="post-title" href={href}>{title}</a>
            <p class="date">{created_at}</p>
            <p class="description">{description}</p>
        </div>
    }
    .to_string()
}

pub fn home_page(content: String) -> String {
    let header = header();

    let section = render! {
        <section class="home">
            <div class="headingcontainer">
            <h1 class="heading">記事一覧</h1>
            </div>
            {content}
        </section>
    }
    .to_string();

    let body = format!("{}{}", header, section);

    document(DocumentProps {
        title: "home".to_string(),
        description: "takurinton blog".to_string(),
        body_content: body,
        include_hljs: true,
        og_title: None,
        og_description: None,
    })
}

pub fn truncate_to_char_boundary(s: &str, max_chars: usize) -> String {
    s.char_indices()
        .nth(max_chars)
        .map(|(idx, _)| &s[..idx])
        .unwrap_or(s)
        .to_string()
}
