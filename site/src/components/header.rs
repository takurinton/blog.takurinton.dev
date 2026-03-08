use app::render;

pub fn header() -> String {
    render! {
        <header class="header">
            <a class="header-title" href="/">
                blog.takurinton.dev
            </a>
        </header>
    }
    .to_string()
}
