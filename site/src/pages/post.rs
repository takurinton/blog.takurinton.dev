use app::{css, render};

use crate::components::document::{document, DocumentProps};
use crate::components::header::header;

pub fn post_page(
    content: String,
    title: String,
    description: String,
    created_at: String,
) -> String {
    let header = header();

    let title_cls = css! { text-align: center; };
    let date_cls = css! { text-align: right; color: var(--color-text-muted); };
    let content_cls = css!(
        "
        max-width: var(--content-width);
        margin: 0 auto 40px;
        padding: 0 24px;
        line-height: 1.8;
        & h1 {
            font-size: 1.6rem;
        }
        & h2 {
            font-size: 1.2rem;
            padding-bottom: 8px;
            border-bottom: 1.2px solid var(--color-border);
        }
        & blockquote {
            border-left: 4px solid var(--color-border);
            padding-left: 1rem;
            margin: 1.5rem 0;
            color: var(--color-text-muted);
            font-style: italic;
        }
        & table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
        }
        & th, & td {
            border: 1px solid var(--color-border);
            padding: 8px 12px;
            text-align: left;
        }
        & th {
            background: #f5f5f5;
            font-weight: 700;
        }
        @media screen and (max-width: 768px) {
            code, pre, span { font-size: 0.8rem; }
        }
    "
    );

    let body = render! {
        <div class={content_cls}>
            <h1 class={title_cls}>{title.clone()}</h1>
            <p class={date_cls}>{created_at}</p>
            {content}
        </div>
    }
    .to_string();

    let body_content = format!("{}{}", header, body);

    document(DocumentProps {
        title: title.clone(),
        description: description.clone(),
        body_content,
        include_hljs: true,
        og_title: Some(title),
        og_description: Some(description),
    })
}
