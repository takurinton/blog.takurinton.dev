use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;

#[derive(Clone)]
pub struct PageCache {
    inner: Rc<RefCell<HashMap<String, String>>>,
}

impl PageCache {
    pub fn new() -> Self {
        PageCache {
            inner: Rc::new(RefCell::new(HashMap::new())),
        }
    }

    pub fn get(&self, key: &str) -> Option<String> {
        self.inner.borrow().get(key).cloned()
    }

    pub fn set(&self, key: &str, value: String) {
        self.inner.borrow_mut().insert(key.to_string(), value);
    }
}
