extern crate markdown;

use std::fs;
use std::path::Path;

use markdown::markdown_to_html;
use site::pages::home::{home_page, post_list_item};
use site::pages::post::post_page;
use site::routes::Route;

fn create_dir(path: &str) {
    match fs::create_dir_all(path) {
        Ok(_) => {}
        Err(err) => {
            println!("{:?}", err);
        }
    }
}

fn get_md_files() -> Vec<String> {
    let mut files = Vec::new();
    let paths = match fs::read_dir("./posts") {
        Ok(paths) => paths,
        Err(_) => {
            println!("posts ディレクトリが存在しません");
            return files;
        }
    };
    for path in paths {
        let path = path.unwrap().path();
        if path.is_file() {
            let file_name = path.file_name().unwrap().to_str().unwrap();
            if file_name.ends_with(".md") {
                files.push(file_name.to_string());
            }
        }
    }
    files
}

fn copy_dir(src: &str, dest_subdir: &str) {
    let paths = match fs::read_dir(src) {
        Ok(paths) => paths,
        Err(_) => {
            println!("{} ディレクトリが存在しません", src);
            return;
        }
    };

    for path in paths {
        let path = path.unwrap().path();
        if path.is_file() {
            let file_name = path.file_name().unwrap().to_str().unwrap();
            let dest = Path::new("./dist").join(dest_subdir).join(file_name);
            create_dir(dest.parent().unwrap().to_str().unwrap());
            match fs::copy(&path, dest) {
                Ok(_) => {}
                Err(err) => {
                    println!("{:?}", err);
                }
            }
        }
    }
}

struct PostMeta {
    id: String,
    title: String,
    description: String,
    created_at: String,
}

fn read_post(md_file: &str) -> Option<(PostMeta, String)> {
    let md = match fs::read_to_string(Path::new("./posts").join(md_file)) {
        Ok(md) => md,
        Err(_) => {
            println!("{} ファイルが読み込めません", md_file);
            return None;
        }
    };

    let frontmatter = markdown::get_frontmatter(&md);
    let id = frontmatter.get("id")?.to_string();
    let title = frontmatter.get("title")?.to_string();
    let created_at = frontmatter.get("created_at")?.to_string();
    let description = frontmatter
        .get("description")
        .map(|d| d.to_string())
        .unwrap_or_default();

    let md_body = markdown::remove_frontmatter(&md);
    Some((
        PostMeta {
            id,
            title,
            description,
            created_at,
        },
        md_body,
    ))
}

fn generate_posts(md_files: &[String]) {
    let mut sorted: Vec<(i32, &String)> = md_files
        .iter()
        .map(|file| {
            let id = file.replace(".md", "").parse::<i32>().unwrap();
            (id, file)
        })
        .collect();
    sorted.sort_by(|a, b| b.0.cmp(&a.0));

    let mut html = String::new();
    for (_, md_file) in &sorted {
        if let Some((meta, md_body)) = read_post(md_file) {
            let rendered = markdown_to_html(&md_body);
            let content = markdown::html_to_string(rendered);
            html.push_str(&post_list_item(
                &meta.id,
                &meta.title,
                &meta.created_at,
                &content,
            ));
        }
    }

    let page = home_page(html);
    let route = Route::Home;
    let path = Path::new("./").join(route.output_path());
    create_dir(path.parent().unwrap().to_str().unwrap());
    match fs::write(&path, page) {
        Ok(_) => {}
        Err(err) => println!("{:?}", err),
    }
    println!("created: {}", route.output_path());
}

fn generate_post(md_files: &[String]) {
    for md_file in md_files {
        if let Some((meta, md_body)) = read_post(md_file) {
            let html = markdown_to_html(&md_body);
            let page = post_page(html, meta.title, meta.description, meta.created_at);

            let route = Route::Post { id: meta.id };
            let path = Path::new("./").join(route.output_path());
            create_dir(path.parent().unwrap().to_str().unwrap());
            match fs::write(&path, page) {
                Ok(_) => {}
                Err(err) => {
                    println!("{:?}", err);
                    continue;
                }
            }
            println!("created: posts/{} -> {}", md_file, route.output_path());
        }
    }
}

fn generate_rss(md_files: &[String]) {
    let rss_feed: String = md_files
        .iter()
        .filter_map(|md_file| {
            let (meta, _) = read_post(md_file)?;
            let link = format!(
                "https://blog.takurinton.dev{}",
                Route::Post { id: meta.id }.url_path()
            );
            Some(format!(
                "<item><title>{}</title><link>{}</link><description>{}</description><pubDate>{}</pubDate></item>",
                meta.title, link, meta.description, meta.created_at
            ))
        })
        .collect();

    let rss = format!(
        r#"<?xml version="1.0" encoding="UTF-8"?>
  <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
  <atom:link href="https://blog.takurinton.dev/rss.xml" rel="self" type="application/rss+xml" />
  <title>たくりんとん</title>
  <link>https://blog.takurinton.dev</link>
  <description>たくりんとんのブログです</description>
  <language>en</language>
  <managingEditor>takurinton@takurinton.com (takurinton)</managingEditor>
  <webMaster>takurinton@takurinton.com (takurinton)</webMaster>
  <image>
      <url>https://takurinton.dev/me.jpeg</url>
      <title>たくりんとん</title>
      <link>https://blog.takurinton.dev</link>
      <width>32</width>
      <height>32</height>
  </image>
  {}
  </channel>
  </rss>
  "#,
        rss_feed
    );

    let path = Path::new("./dist").join("rss.xml");
    create_dir(path.parent().unwrap().to_str().unwrap());
    match fs::write(path, rss) {
        Ok(_) => println!("created: dist/rss.xml"),
        Err(err) => println!("{:?}", err),
    }
}

fn main() {
    let md_files = get_md_files();
    copy_dir("./styles", "styles");
    copy_dir("./scripts", "scripts");
    generate_posts(&md_files);
    generate_post(&md_files);
    generate_rss(&md_files);
}
