use std::rc::Rc;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{Document, Element, Event, HtmlAnchorElement};

use crate::cache::{PageCache, ScrollCache};
use crate::signal::Signal;

pub struct Router {
    route: Signal<String>,
    cache: Option<PageCache>,
    scroll_cache: Option<ScrollCache>,
    on_navigate: Option<Rc<dyn Fn()>>,
}

impl Router {
    pub fn new() -> Self {
        let window = web_sys::window().unwrap();
        let location = window.location();
        let pathname = location.pathname().unwrap_or_else(|_| "/".to_string());

        Router {
            route: Signal::new(pathname),
            cache: None,
            scroll_cache: None,
            on_navigate: None,
        }
    }

    pub fn with_cache(mut self, cache: PageCache) -> Self {
        self.cache = Some(cache);
        self
    }

    pub fn with_scroll_cache(mut self, scroll_cache: ScrollCache) -> Self {
        self.scroll_cache = Some(scroll_cache);
        self
    }

    pub fn with_on_navigate<F: Fn() + 'static>(mut self, f: F) -> Self {
        self.on_navigate = Some(Rc::new(f));
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
        let scroll_cache = self.scroll_cache.clone();
        let on_navigate = self.on_navigate.clone();
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
                // 遷移前に現在のスクロール位置を保存
                if let Some(ref sc) = scroll_cache {
                    save_scroll(sc, &route.get());
                }
                navigate(&route, &href, cache.clone(), on_navigate.clone());
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
        let scroll_cache = self.scroll_cache.clone();
        let on_navigate = self.on_navigate.clone();
        let window = web_sys::window().unwrap();
        let closure = Closure::<dyn Fn(Event)>::new(move |_: Event| {
            let location = web_sys::window().unwrap().location();
            let new_pathname = location.pathname().unwrap_or_else(|_| "/".to_string());

            // 遷移前に現在のスクロール位置を保存
            if let Some(ref sc) = scroll_cache {
                save_scroll(sc, &route.get());
            }

            // 遷移先の保存済みスクロール位置を取得
            let scroll_pos = scroll_cache.as_ref().and_then(|sc| sc.get(&new_pathname));

            route.set(new_pathname.clone());
            load_page(
                &new_pathname,
                cache.clone(),
                scroll_pos,
                on_navigate.clone(),
            );
        });

        window
            .add_event_listener_with_callback("popstate", closure.as_ref().unchecked_ref())
            .unwrap();
        closure.forget();
    }
}

fn navigate(
    route: &Signal<String>,
    href: &str,
    cache: Option<PageCache>,
    on_navigate: Option<Rc<dyn Fn()>>,
) {
    let window = web_sys::window().unwrap();
    let history = window.history().unwrap();
    history
        .push_state_with_url(&JsValue::NULL, "", Some(href))
        .unwrap();
    route.set(href.to_string());
    // 新規遷移はトップへスクロール
    load_page(href, cache, None, on_navigate);
}

fn load_page(
    href: &str,
    cache: Option<PageCache>,
    scroll_restore: Option<(f64, f64)>,
    on_navigate: Option<Rc<dyn Fn()>>,
) {
    let href = href.to_string();

    wasm_bindgen_futures::spawn_local(async move {
        // キャッシュがあればそれを使う
        if let Some(ref cache) = cache {
            if let Some(html) = cache.get(&href) {
                apply_html(&html);
                restore_scroll(scroll_restore);
                if let Some(ref f) = on_navigate {
                    f();
                }
                return;
            }
        }

        if let Some(html) = fetch_html(&href).await {
            if let Some(ref cache) = cache {
                cache.set(&href, html.clone());
            }
            apply_html(&html);
            restore_scroll(scroll_restore);
            if let Some(ref f) = on_navigate {
                f();
            }
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

    // 遷移先ページの <style> タグを現在の <head> にマージ
    sync_styles(&doc, &new_doc);

    let _ = js_sys::eval("if(typeof hljs !== 'undefined') hljs.highlightAll()");
}

/// 遷移先の <style> タグを現在の <head> にマージする。
/// ID 付きの style タグは重複チェック、ID なしは内容ベースで重複���ェック。
fn sync_styles(doc: &Document, new_doc: &Document) {
    let head = match doc.head() {
        Some(h) => h,
        None => return,
    };

    let new_styles = new_doc.query_selector_all("style").unwrap();
    let len = new_styles.length();

    for i in 0..len {
        let new_style = match new_styles.item(i) {
            Some(el) => el,
            None => continue,
        };
        let new_style: Element = match new_style.dyn_into() {
            Ok(el) => el,
            Err(_) => continue,
        };

        let id = new_style
            .dyn_ref::<Element>()
            .and_then(|el| el.get_attribute("id"));

        let already_exists = if let Some(ref id) = id {
            // ID 付き: 同じ ID が既に head にあればスキップ
            doc.get_element_by_id(id).is_some()
        } else {
            // ID なし: 同じ内容の style が既にあるかチェック
            let new_content = new_style.text_content().unwrap_or_default();
            let existing = doc.query_selector_all("head > style").unwrap();
            let mut found = false;
            for j in 0..existing.length() {
                if let Some(el) = existing.item(j) {
                    if el.text_content().unwrap_or_default() == new_content {
                        found = true;
                        break;
                    }
                }
            }
            found
        };

        if !already_exists {
            let _ = head.append_child(&new_style);
        }
    }
}

fn save_scroll(scroll_cache: &ScrollCache, href: &str) {
    let window = web_sys::window().unwrap();
    let x = window.scroll_x().unwrap_or(0.0);
    let y = window.scroll_y().unwrap_or(0.0);
    scroll_cache.set(href, (x, y));
}

fn restore_scroll(pos: Option<(f64, f64)>) {
    let window = web_sys::window().unwrap();
    let (x, y) = pos.unwrap_or((0.0, 0.0));
    window.scroll_to_with_x_and_y(x, y);
}
