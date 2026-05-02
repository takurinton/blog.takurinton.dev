use std::fs;
use std::path::Path;

use crustal_blog_utils::{copy_files_with_extension, read_posts, Post};
use crustal_markdown::markdown_to_html;
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

fn generate_posts(posts: &[Post]) {
    let mut html = String::new();
    for post in posts {
        let rendered = markdown_to_html(&post.body);
        let content = crustal_markdown::html_to_string(rendered);
        html.push_str(&post_list_item(
            &post.meta.id,
            &post.meta.title,
            &post.meta.created_at,
            &content,
        ));
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

fn generate_post(posts: &[Post]) {
    for post in posts {
        let html = markdown_to_html(&post.body);
        let page = post_page(
            html,
            post.meta.title.clone(),
            post.meta.description.clone(),
            post.meta.created_at.clone(),
        );

        let route = Route::Post {
            id: post.meta.id.clone(),
        };
        let path = Path::new("./").join(route.output_path());
        create_dir(path.parent().unwrap().to_str().unwrap());
        match fs::write(&path, page) {
            Ok(_) => {}
            Err(err) => {
                println!("{:?}", err);
                continue;
            }
        }
        println!(
            "created: posts/{} -> {}",
            post.file_name,
            route.output_path()
        );
    }
}

fn generate_rss(posts: &[Post]) {
    let rss_feed: String = posts
        .iter()
        .map(|post| {
            let link = format!(
                "https://blog.takurinton.dev{}",
                Route::Post {
                    id: post.meta.id.clone()
                }
                .url_path()
            );
            format!(
                "<item><title>{}</title><link>{}</link><description>{}</description><pubDate>{}</pubDate></item>",
                post.meta.title, link, post.meta.description, post.meta.created_at
            )
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
    let posts = match read_posts("./posts") {
        Ok(posts) => posts,
        Err(_) => {
            println!("posts ディレクトリが存在しません");
            return;
        }
    };
    if let Err(err) = copy_files_with_extension("./scripts", "./dist/scripts", "js") {
        println!("{:?}", err);
    }
    generate_posts(&posts);
    generate_post(&posts);
    generate_rss(&posts);
}
