use app::{css, render};

pub fn header() -> String {
    let header_cls = css! { display: flex; };
    render! {
        <header class={header_cls}>
            <a class="header-title" href="/">
                blog.takurinton.dev
            </a>
        </header>
    }
    .to_string()
}
