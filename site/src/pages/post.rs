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

    let body = render! {
        <div class="content">
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
