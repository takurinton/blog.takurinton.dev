use std::cell::RefCell;
use std::rc::Rc;

type Callback<T> = Box<dyn Fn(&T)>;

struct SignalInner<T> {
    value: T,
    subscribers: Vec<Callback<T>>,
}

pub struct Signal<T> {
    inner: Rc<RefCell<SignalInner<T>>>,
}

impl<T: Clone + 'static> Clone for Signal<T> {
    fn clone(&self) -> Self {
        Signal {
            inner: Rc::clone(&self.inner),
        }
    }
}

impl<T: Clone + 'static> Signal<T> {
    pub fn new(value: T) -> Self {
        Signal {
            inner: Rc::new(RefCell::new(SignalInner {
                value,
                subscribers: Vec::new(),
            })),
        }
    }

    pub fn get(&self) -> T {
        self.inner.borrow().value.clone()
    }

    pub fn set(&self, value: T) {
        {
            self.inner.borrow_mut().value = value;
        }
        self.notify();
    }

    pub fn update(&self, f: impl FnOnce(T) -> T) {
        {
            let mut inner = self.inner.borrow_mut();
            let old = inner.value.clone();
            inner.value = f(old);
        }
        self.notify();
    }

    pub fn subscribe(&self, f: impl Fn(&T) + 'static) {
        self.inner.borrow_mut().subscribers.push(Box::new(f));
    }

    fn notify(&self) {
        let inner = self.inner.borrow();
        for sub in &inner.subscribers {
            sub(&inner.value);
        }
    }
}

impl<T: Clone + ToString + 'static> std::fmt::Display for Signal<T> {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.get().to_string())
    }
}

pub struct Derived<T> {
    compute: Box<dyn Fn() -> T>,
}

impl<T> Derived<T> {
    pub fn new(compute: impl Fn() -> T + 'static) -> Self {
        Derived {
            compute: Box::new(compute),
        }
    }

    pub fn get(&self) -> T {
        (self.compute)()
    }
}

pub fn effect(f: impl Fn() + 'static) {
    f();
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::cell::Cell;

    #[test]
    fn test_signal_new_get() {
        let s = Signal::new(42);
        assert_eq!(s.get(), 42);
    }

    #[test]
    fn test_signal_set() {
        let s = Signal::new(0);
        s.set(10);
        assert_eq!(s.get(), 10);
    }

    #[test]
    fn test_signal_update() {
        let s = Signal::new(5);
        s.update(|v| v + 3);
        assert_eq!(s.get(), 8);
    }

    #[test]
    fn test_signal_subscribe() {
        let s = Signal::new(0);
        let called = Rc::new(Cell::new(0));
        let called_clone = called.clone();
        s.subscribe(move |v| {
            called_clone.set(*v);
        });
        s.set(42);
        assert_eq!(called.get(), 42);
    }

    #[test]
    fn test_signal_display() {
        let s = Signal::new(123);
        assert_eq!(format!("{}", s), "123");
    }

    #[test]
    fn test_derived() {
        let s = Signal::new(3);
        let s2 = s.clone();
        let d = Derived::new(move || s2.get() * 2);
        assert_eq!(d.get(), 6);
        s.set(5);
        assert_eq!(d.get(), 10);
    }

    #[test]
    fn test_effect() {
        let called = Rc::new(Cell::new(false));
        let called_clone = called.clone();
        effect(move || {
            called_clone.set(true);
        });
        assert!(called.get());
    }
}
