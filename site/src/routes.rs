pub enum Route {
    Home,
    Post { id: String },
}

impl Route {
    pub fn output_path(&self) -> String {
        match self {
            Route::Home => "dist/index.html".to_string(),
            Route::Post { id } => format!("dist/post/{}/index.html", id),
        }
    }

    pub fn url_path(&self) -> String {
        match self {
            Route::Home => "/".to_string(),
            Route::Post { id } => format!("/post/{}/index.html", id),
        }
    }
}
