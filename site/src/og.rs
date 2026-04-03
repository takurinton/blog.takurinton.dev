use std::cell::RefCell;
use std::collections::HashMap;

use wasm_bindgen::JsCast;
use wasm_bindgen_futures::spawn_local;

thread_local! {
    static CACHE: RefCell<HashMap<String, String>> = RefCell::new(HashMap::new());
}

const CSS: &str = r#"
.og > .a {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  width: 80%;
  padding: 10px;
  display: flex;
  text-decoration: none;
  color: #222222;
}
.left {
    max-width: 100px;
    min-width: 100px;
    height: 100px;
    width: 100px;
    text-align: center;
    padding-right: 30px;
}
.left > img {
    height: 100px;
    width: 100px;
}
.right {
    display: block;
    overflow: hidden;
}
.right > h1,
.right > p,
.right > a {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.right > h1 {
    height: 50px;
    margin: 0;
}
.right > p {
    margin: 0;
}
.link {
    color: gray;
}
@media screen and (max-width: 768px) {
  .og > .a {
      height: 70px;
      width: 90%;
  }
  .left {
      max-width: 60px;
      min-width: 60px;
      max-height: 60px;
      min-height: 60px;
      padding-right: 10px;
      padding-top: 10px;
  }
  .left > img {
      height: 50px;
      width: 50px;
  }
  .right {
      height: 100px;
  }
  .right > h1 {
      height: 32px;
      font-size: 1.2rem;
  }
  .right > p {
      font-size: 0.8rem;
  }
}
"#;

pub fn setup_og_cards() {
    spawn_local(async {
        let window = web_sys::window().unwrap();
        let doc = window.document().unwrap();

        inject_og_style(&doc);

        let og_elements = doc.get_elements_by_class_name("og");
        let len = og_elements.length();
        for i in 0..len {
            let element = match og_elements.item(i) {
                Some(el) => el,
                None => continue,
            };
            let url = match element
                .query_selector("div[data-url]")
                .ok()
                .flatten()
                .and_then(|el| el.get_attribute("data-url"))
            {
                Some(u) => u,
                None => continue,
            };

            let cached = CACHE.with(|c| c.borrow().get(&url).cloned());
            if let Some(html) = cached {
                element.set_inner_html(&html);
                continue;
            }

            let element_clone = element.clone();
            let url_clone = url.clone();
            spawn_local(async move {
                match fetch_og_html(&url_clone).await {
                    Some(html) => {
                        CACHE.with(|c| c.borrow_mut().insert(url_clone, html.clone()));
                        element_clone.set_inner_html(&html);
                    }
                    None => {
                        element_clone.set_inner_html(
                            r#"<div class="a"><div class="right" style="height:100px"><h1 style="color:red">カードの取得に失敗しました。</h1></div></div>"#,
                        );
                    }
                }
            });
        }
    });
}

fn inject_og_style(doc: &web_sys::Document) {
    if doc.get_element_by_id("og-style").is_some() {
        return;
    }
    let style = doc.create_element("style").unwrap();
    style.set_id("og-style");
    style.set_inner_html(CSS);
    if let Some(head) = doc.head() {
        head.append_child(style.unchecked_ref::<web_sys::Node>())
            .unwrap();
    }
}

async fn fetch_og_html(url: &str) -> Option<String> {
    let window = web_sys::window().unwrap();
    let api_url = format!("https://meta.takur.in/api/?url={}", url);

    let resp = wasm_bindgen_futures::JsFuture::from(window.fetch_with_str(&api_url))
        .await
        .ok()?;
    let resp: web_sys::Response = resp.dyn_into().ok()?;

    let json = wasm_bindgen_futures::JsFuture::from(resp.json().ok()?)
        .await
        .ok()?;

    let title = js_sys::Reflect::get(&json, &"title".into())
        .ok()?
        .as_string()
        .unwrap_or_default();
    let description = js_sys::Reflect::get(&json, &"description".into())
        .ok()?
        .as_string()
        .unwrap_or_default();
    let image = js_sys::Reflect::get(&json, &"image".into())
        .ok()?
        .as_string()
        .unwrap_or_default();

    Some(og_html(url, &title, &description, &image))
}

fn og_html(url: &str, title: &str, description: &str, image: &str) -> String {
    format!(
        r#"<a href="{url}" target="_blank" class="a">
<div class="left">
    <img src="{image}" alt="{title}" />
</div>
<div class="right">
    <h1>{title}</h1>
    <p class="description">{description}</p>
    <p class="link">{url}</p>
</div>
</a>"#
    )
}
