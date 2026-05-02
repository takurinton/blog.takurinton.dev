use crustal_macros::{css, render};

use crate::components::document::{document, DocumentProps};
use crate::components::header::header;
use crate::routes::Route;

pub fn post_list_item(id: &str, title: &str, created_at: &str, description: &str) -> String {
    let href = Route::Post { id: id.to_string() }.url_path();
    let title = title.to_string();
    let created_at = created_at.to_string();
    let description = truncate_to_char_boundary(description, 300);
    let post_cls = css! { margin-top: 24px; padding-bottom: 8px; border-bottom: 1.2px solid var(--color-border); };
    let date_cls = css! { font-size: 0.9rem; color: var(--color-text-muted); margin: 8px 0; };
    let desc_cls = css! { font-size: 1rem; margin: 16px 0; line-height: 1.6; };
    let title_cls = css!(
        "
        font-weight: 700;
        font-size: 1.4rem;
        color: var(--color-text);
        &:hover {
            color: var(--color-primary);
        }
        @media screen and (max-width: 768px) {
            font-size: 1.2rem;
        }
    "
    );
    render! {
        <div class={post_cls}>
            <a class={title_cls} href={href}>{title}</a>
            <p class={date_cls}>{created_at}</p>
            <p class={desc_cls}>{description}</p>
        </div>
    }
    .to_string()
}

pub fn home_page(content: String) -> String {
    let header = header();

    let home_cls = css! { max-width: var(--content-width); margin: 0 auto; padding: 0 24px 40px; };
    let headingcontainer_cls = css! { text-align: center; };
    let heading_cls = css! { font-size: 1.6rem; font-weight: bold; margin-bottom: 24px; };

    let section = render! {
        <section class={home_cls}>
            <div class={headingcontainer_cls}>
            <h1 class={heading_cls}>記事一覧</h1>
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
