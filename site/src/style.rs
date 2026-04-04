use std::cell::RefCell;

thread_local! {
    static STYLES: RefCell<Vec<(&'static str, &'static str)>> = RefCell::new(Vec::new());
}

pub fn push(id: &'static str, css: &'static str) {
    STYLES.with(|s| {
        let mut styles = s.borrow_mut();
        if !styles.iter().any(|(existing_id, _)| *existing_id == id) {
            styles.push((id, css));
        }
    });
}

pub fn collect_and_clear() -> String {
    STYLES.with(|s| {
        let mut styles = s.borrow_mut();
        let result = styles
            .iter()
            .map(|(_, css)| *css)
            .collect::<Vec<_>>()
            .join("\n");
        styles.clear();
        result
    })
}
