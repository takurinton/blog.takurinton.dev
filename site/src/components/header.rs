use crustal_macros::{css, render};

pub fn header() -> String {
    let header_cls = css! { display: flex; };
    let title_cls = css!(
        "
        font-size: 1.6rem;
        color: var(--color-text);
        padding: 24px;
        &:hover {
            color: var(--color-primary);
        }
    "
    );
    render! {
        <header class={header_cls}>
            <a class={title_cls} href="/">
                blog.takurinton.dev
            </a>
        </header>
    }
    .to_string()
}
