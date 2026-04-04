use proc_macro::TokenStream;
use quote::quote;

fn fnv1a_hash(s: &str) -> u32 {
    let mut hash: u32 = 2166136261;
    for byte in s.bytes() {
        hash ^= byte as u32;
        hash = hash.wrapping_mul(16777619);
    }
    hash
}

pub fn css_impl(input: TokenStream) -> TokenStream {
    let css_text = input.to_string();
    let css_text = css_text.trim().to_string();

    let hash = fnv1a_hash(&css_text);
    let class_name = format!("css-{:06x}", hash & 0x00FF_FFFF);
    let full_css = format!(".{} {{ {} }}", class_name, css_text);

    quote! {{
        const __NAME: &'static str = #class_name;
        const __CSS: &'static str = #full_css;

        #[cfg(not(target_arch = "wasm32"))]
        crate::style::push(__NAME, __CSS);

        #[cfg(target_arch = "wasm32")]
        {
            use ::wasm_bindgen::JsCast as _;
            let __doc = ::web_sys::window().unwrap().document().unwrap();
            if __doc.get_element_by_id(__NAME).is_none() {
                let __el = __doc.create_element("style").unwrap();
                __el.set_id(__NAME);
                __el.set_inner_html(__CSS);
                if let Some(__head) = __doc.head() {
                    __head
                        .append_child(__el.unchecked_ref::<::web_sys::Node>())
                        .unwrap();
                }
            }
        }

        __NAME
    }}
    .into()
}

#[cfg(test)]
mod tests {
    use super::fnv1a_hash;

    #[test]
    fn hash_is_stable() {
        let h1 = fnv1a_hash("color: red;");
        let h2 = fnv1a_hash("color: red;");
        assert_eq!(h1, h2);
    }

    #[test]
    fn different_css_different_hash() {
        let h1 = fnv1a_hash("color: red;");
        let h2 = fnv1a_hash("color: blue;");
        assert_ne!(h1, h2);
    }
}
