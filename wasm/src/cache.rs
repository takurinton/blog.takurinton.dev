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

#[derive(Clone)]
pub struct ScrollCache {
    inner: Rc<RefCell<HashMap<String, (f64, f64)>>>,
}

impl ScrollCache {
    pub fn new() -> Self {
        ScrollCache {
            inner: Rc::new(RefCell::new(HashMap::new())),
        }
    }

    pub fn get(&self, key: &str) -> Option<(f64, f64)> {
        self.inner.borrow().get(key).copied()
    }

    pub fn set(&self, key: &str, pos: (f64, f64)) {
        self.inner.borrow_mut().insert(key.to_string(), pos);
    }
}
