use crate::signal::Signal;

pub trait Bindable {
    fn bind(self, node: &web_sys::Text);
}

impl Bindable for String {
    fn bind(self, node: &web_sys::Text) {
        node.set_text_content(Some(&self));
    }
}

impl Bindable for &str {
    fn bind(self, node: &web_sys::Text) {
        node.set_text_content(Some(self));
    }
}

impl<T: Clone + ToString + 'static> Bindable for Signal<T> {
    fn bind(self, node: &web_sys::Text) {
        node.set_text_content(Some(&self.get().to_string()));
        let node = node.clone();
        self.subscribe(move |v| {
            node.set_text_content(Some(&v.to_string()));
        });
    }
}

macro_rules! impl_bindable_primitive {
    ($($t:ty),*) => {
        $(
            impl Bindable for $t {
                fn bind(self, node: &web_sys::Text) {
                    node.set_text_content(Some(&self.to_string()));
                }
            }
        )*
    };
}

impl_bindable_primitive!(i32, i64, u32, u64, f32, f64, bool, usize);
