use crustal_macros::render;

pub struct DocumentProps {
    pub title: String,
    pub description: String,
    pub body_content: String,
    pub include_hljs: bool,
    pub og_title: Option<String>,
    pub og_description: Option<String>,
}

pub fn document(props: DocumentProps) -> String {
    // コンポーネント CSS を先に回収（body_content レンダリング時に登録済み）
    let component_css = crate::style::collect_and_clear();
    // グローバルスタイルを登録して回収
    crate::global_styles::inject_global_styles();
    let global_css = crate::style::collect_and_clear();

    let injected_style = if global_css.is_empty() && component_css.is_empty() {
        String::new()
    } else {
        // グローバル（:root 等）を先に出力し、コンポーネント CSS を後に
        format!("<style>{}\n{}</style>", global_css, component_css)
    };

    let hljs_css = if props.include_hljs {
        render! {
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/atom-one-dark.min.css"></link>
        }.to_string()
    } else {
        String::new()
    };

    let hljs_scripts = if props.include_hljs {
        render! {
            <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"></script>
        }.to_string()
        + &render! {
            <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/go.min.js"></script>
        }.to_string()
    } else {
        String::new()
    };

    let hljs_init = if props.include_hljs {
        render! {
            <script>hljs.highlightAll();</script>
        }
        .to_string()
    } else {
        String::new()
    };

    let og_title_meta = match &props.og_title {
        Some(t) => render! {
            <meta property="og:title" content={t.clone()}></meta>
        }
        .to_string(),
        None => String::new(),
    };

    let og_description_meta = match &props.og_description {
        Some(d) => render! {
            <meta property="og:description" content={d.clone()}></meta>
        }
        .to_string(),
        None => String::new(),
    };

    let description_meta = render! {
        <meta name="description" content={props.description.clone()}></meta>
    }
    .to_string();

    render! {
        <html lang="en">
            <head>
                <title>{props.title} | blog.takurinton.dev</title>
                <meta charset="utf-8"></meta>
                <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
                <link
                    rel="shortcut icon"
                    href="https://takurinton.dev/favicon.ico"
                    type="image/x-icon"
                ></link>
                {injected_style}
                {hljs_css}
                <meta name="twitter:card" content="summary"></meta>
                {og_title_meta}
                {og_description_meta}
                <meta property="og:url" content="https://blog.takurinton.dev/"></meta>
                <meta property="og:image" content="https://takurinton.dev/me.jpeg"></meta>
                <meta property="twitter:url" content="https://blog.takurinton.dev/"></meta>
                <meta property="twitter:image" content="https://takurinton.dev/me.jpeg"></meta>
                {description_meta}
                {hljs_scripts}
                {hljs_init}
            </head>
            <body>
                {props.body_content}
                <script type="module" src="/scripts/wasm-boot.js"></script>
            </body>
        </html>
    }
    .to_string()
}
