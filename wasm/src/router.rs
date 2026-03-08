use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{Document, Element, Event, HtmlAnchorElement, Window};

use crate::signal::Signal;

pub struct Router {
    route: Signal<String>,
}

impl Router {
    pub fn new() -> Self {
        let window = web_sys::window().unwrap();
        let location = window.location();
        let pathname = location.pathname().unwrap_or_else(|_| "/".to_string());

        Router {
            route: Signal::new(pathname),
        }
    }

    pub fn boot(&self, doc: &Document) {
        self.setup_click_intercept(doc);
        self.setup_popstate();
    }

    fn setup_click_intercept(&self, doc: &Document) {
        let route = self.route.clone();
        let closure = Closure::<dyn Fn(Event)>::new(move |e: Event| {
            let target = match e.target() {
                Some(t) => t,
                None => return,
            };

            // Walk up to find <a> element
            let anchor: Option<HtmlAnchorElement> =
                target.dyn_ref::<HtmlAnchorElement>().cloned().or_else(|| {
                    target
                        .dyn_ref::<Element>()
                        .and_then(|el| el.closest("a").ok().flatten())
                        .and_then(|el| el.dyn_into::<HtmlAnchorElement>().ok())
                });

            let anchor = match anchor {
                Some(a) => a,
                None => return,
            };

            let href = anchor.get_attribute("href").unwrap_or_default();

            // Only intercept internal links
            if href.starts_with('/') {
                e.prevent_default();
                navigate(&route, &href);
            }
        });

        doc.add_event_listener_with_callback("click", closure.as_ref().unchecked_ref())
            .unwrap();
        closure.forget();
    }

    fn setup_popstate(&self) {
        let route = self.route.clone();
        let window = web_sys::window().unwrap();
        let closure = Closure::<dyn Fn(Event)>::new(move |_: Event| {
            let location = web_sys::window().unwrap().location();
            let pathname = location.pathname().unwrap_or_else(|_| "/".to_string());
            route.set(pathname.clone());
            load_page(&pathname);
        });

        window
            .add_event_listener_with_callback("popstate", closure.as_ref().unchecked_ref())
            .unwrap();
        closure.forget();
    }
}

fn navigate(route: &Signal<String>, href: &str) {
    let window = web_sys::window().unwrap();
    let history = window.history().unwrap();
    history
        .push_state_with_url(&JsValue::NULL, "", Some(href))
        .unwrap();
    route.set(href.to_string());
    load_page(href);
}

fn load_page(href: &str) {
    let window = web_sys::window().unwrap();
    let href = href.to_string();

    wasm_bindgen_futures::spawn_local(async move {
        let resp = match wasm_bindgen_futures::JsFuture::from(window.fetch_with_str(&href)).await {
            Ok(r) => r,
            Err(_) => return,
        };

        let resp: web_sys::Response = resp.dyn_into().unwrap();
        let text = match wasm_bindgen_futures::JsFuture::from(resp.text().unwrap()).await {
            Ok(t) => t,
            Err(_) => return,
        };

        let html = text.as_string().unwrap_or_default();

        let doc = web_sys::window().unwrap().document().unwrap();

        // Parse the fetched HTML and replace <body> content
        let parser = web_sys::DomParser::new().unwrap();
        let new_doc = parser
            .parse_from_string(&html, web_sys::SupportedType::TextHtml)
            .unwrap();

        if let Some(new_body) = new_doc.body() {
            if let Some(body) = doc.body() {
                body.set_inner_html(&new_body.inner_html());
            }
        }

        // Update title
        if let Some(new_title) = new_doc.query_selector("title").unwrap() {
            doc.set_title(&new_title.text_content().unwrap_or_default());
        }

        // Re-run highlight.js if available
        let _ = js_sys::eval("if(typeof hljs !== 'undefined') hljs.highlightAll()");
    });
}
