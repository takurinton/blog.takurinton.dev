use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn render_markdown(markdown: &str) -> String {
    markdown::markdown_to_html(markdown)
}
