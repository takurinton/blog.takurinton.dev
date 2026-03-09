pub mod cache;
pub mod reactive;
pub mod router;
pub mod signal;

pub use cache::{PageCache, ScrollCache};
pub use reactive::Bindable;
pub use signal::{Derived, Signal};

use wasm_bindgen::prelude::*;

#[wasm_bindgen(start)]
pub fn boot() {
    let doc = web_sys::window().unwrap().document().unwrap();
    let r = router::Router::new()
        .with_cache(PageCache::new())
        .with_scroll_cache(ScrollCache::new());
    r.boot(&doc);
}
