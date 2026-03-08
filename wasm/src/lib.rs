pub mod reactive;
pub mod router;
pub mod signal;

pub use reactive::Bindable;
pub use signal::{Derived, Signal};

use wasm_bindgen::prelude::*;

#[wasm_bindgen(start)]
pub fn boot() {
    let doc = web_sys::window().unwrap().document().unwrap();
    let r = router::Router::new();
    r.boot(&doc);
}
