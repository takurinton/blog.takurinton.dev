use app::render;

pub struct DocumentProps {
    pub title: String,
    pub description: String,
    pub body_content: String,
    pub include_hljs: bool,
    pub og_title: Option<String>,
    pub og_description: Option<String>,
}

pub fn document(props: DocumentProps) -> String {
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
                <link rel="stylesheet" href="/styles/style.css"></link>
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
                <script type="module" src="/scripts/index.js"></script>
                <script type="module" src="/scripts/wasm-boot.js"></script>
            </body>
        </html>
    }
    .to_string()
}
