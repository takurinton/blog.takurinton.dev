#[cfg(not(target_arch = "wasm32"))]
pub mod components;
#[cfg(not(target_arch = "wasm32"))]
pub mod pages;
#[cfg(not(target_arch = "wasm32"))]
pub mod routes;
#[cfg(not(target_arch = "wasm32"))]
pub mod style;

#[cfg(target_arch = "wasm32")]
mod og;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen::prelude::wasm_bindgen(start)]
pub fn boot() {
    let doc = web_sys::window().unwrap().document().unwrap();
    let r = wasm::Router::new()
        .with_cache(wasm::PageCache::new())
        .with_scroll_cache(wasm::ScrollCache::new())
        .with_on_navigate(og::setup_og_cards);
    r.boot(&doc);
    og::setup_og_cards();
}
