use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{Document, Element, Event, HtmlAnchorElement};

use crate::cache::PageCache;
use crate::signal::Signal;

pub struct Router {
    route: Signal<String>,
    cache: Option<PageCache>,
}

impl Router {
    pub fn new() -> Self {
        let window = web_sys::window().unwrap();
        let location = window.location();
        let pathname = location.pathname().unwrap_or_else(|_| "/".to_string());

        Router {
            route: Signal::new(pathname),
            cache: None,
        }
    }

    pub fn with_cache(mut self, cache: PageCache) -> Self {
        self.cache = Some(cache);
        self
    }

    pub fn boot(&self, doc: &Document) {
        self.setup_click_intercept(doc);
        self.setup_popstate();
        if self.cache.is_some() {
            self.setup_hover_prefetch(doc);
        }
    }

    fn setup_click_intercept(&self, doc: &Document) {
        let route = self.route.clone();
        let cache = self.cache.clone();
        let closure = Closure::<dyn Fn(Event)>::new(move |e: Event| {
            let target = match e.target() {
                Some(t) => t,
                None => return,
            };

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

            if href.starts_with('/') {
                e.prevent_default();
                navigate(&route, &href, cache.clone());
            }
        });

        doc.add_event_listener_with_callback("click", closure.as_ref().unchecked_ref())
            .unwrap();
        closure.forget();
    }

    fn setup_hover_prefetch(&self, doc: &Document) {
        let cache = self.cache.clone();
        let closure = Closure::<dyn Fn(Event)>::new(move |e: Event| {
            let target = match e.target() {
                Some(t) => t,
                None => return,
            };

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
            if !href.starts_with('/') {
                return;
            }

            let cache = match cache.clone() {
                Some(c) => c,
                None => return,
            };

            // すでにキャッシュ済みなら何もしない
            if cache.get(&href).is_some() {
                return;
            }

            prefetch_page(&href, cache);
        });

        doc.add_event_listener_with_callback("mouseover", closure.as_ref().unchecked_ref())
            .unwrap();
        closure.forget();
    }

    fn setup_popstate(&self) {
        let route = self.route.clone();
        let cache = self.cache.clone();
        let window = web_sys::window().unwrap();
        let closure = Closure::<dyn Fn(Event)>::new(move |_: Event| {
            let location = web_sys::window().unwrap().location();
            let pathname = location.pathname().unwrap_or_else(|_| "/".to_string());
            route.set(pathname.clone());
            load_page(&pathname, cache.clone());
        });

        window
            .add_event_listener_with_callback("popstate", closure.as_ref().unchecked_ref())
            .unwrap();
        closure.forget();
    }
}

fn navigate(route: &Signal<String>, href: &str, cache: Option<PageCache>) {
    let window = web_sys::window().unwrap();
    let history = window.history().unwrap();
    history
        .push_state_with_url(&JsValue::NULL, "", Some(href))
        .unwrap();
    route.set(href.to_string());
    load_page(href, cache);
}

fn load_page(href: &str, cache: Option<PageCache>) {
    let href = href.to_string();

    wasm_bindgen_futures::spawn_local(async move {
        // キャッシュがあればそれを使う
        if let Some(ref cache) = cache {
            if let Some(html) = cache.get(&href) {
                apply_html(&html);
                return;
            }
        }

        if let Some(html) = fetch_html(&href).await {
            if let Some(ref cache) = cache {
                cache.set(&href, html.clone());
            }
            apply_html(&html);
        }
    });
}

// ホバー時のバックグラウンドprefetch。DOMは更新しない。
fn prefetch_page(href: &str, cache: PageCache) {
    let href = href.to_string();

    wasm_bindgen_futures::spawn_local(async move {
        if let Some(html) = fetch_html(&href).await {
            cache.set(&href, html);
        }
    });
}

async fn fetch_html(href: &str) -> Option<String> {
    let window = web_sys::window().unwrap();

    let resp = wasm_bindgen_futures::JsFuture::from(window.fetch_with_str(href))
        .await
        .ok()?;
    let resp: web_sys::Response = resp.dyn_into().ok()?;
    let text = wasm_bindgen_futures::JsFuture::from(resp.text().ok()?)
        .await
        .ok()?;

    text.as_string()
}

fn apply_html(html: &str) {
    let doc = web_sys::window().unwrap().document().unwrap();

    let parser = web_sys::DomParser::new().unwrap();
    let new_doc = parser
        .parse_from_string(html, web_sys::SupportedType::TextHtml)
        .unwrap();

    if let Some(new_body) = new_doc.body() {
        if let Some(body) = doc.body() {
            body.set_inner_html(&new_body.inner_html());
        }
    }

    if let Some(new_title) = new_doc.query_selector("title").unwrap() {
        doc.set_title(&new_title.text_content().unwrap_or_default());
    }

    let _ = js_sys::eval("if(typeof hljs !== 'undefined') hljs.highlightAll()");
}
