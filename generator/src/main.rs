extern crate markdown;

use std::fs;
use std::path::Path;

use app::render;
use markdown::markdown_to_html;

trait Generator {
    fn get_md_files(&self) -> Vec<String>;
    fn generate_styles(&self);
    fn generate_scripts(&self);
    fn posts_template(&self, content: String) -> String;
    fn post_template(
        &self,
        content: String,
        title: String,
        created_at: String,
        raw_markdown: String,
    ) -> String;
    fn generate_posts(&self, md_files: Vec<String>);
    fn generate_post(&self, md_files: Vec<String>);
    fn generate_rss(&self, md_files: Vec<String>);
    fn generate(&self, md_files: Vec<String>);
}

fn create_dir(path: &str) {
    match fs::create_dir_all(path) {
        Ok(_) => {}
        Err(err) => {
            println!("{:?}", err);
        }
    }
}

struct HtmlGenerator;

impl Generator for HtmlGenerator {
    fn get_md_files(&self) -> Vec<String> {
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

    fn generate_styles(&self) {
        let paths = match fs::read_dir("./styles") {
            Ok(paths) => paths,
            Err(_) => {
                println!("styles ディレクトリが存在しません");
                return;
            }
        };

        for path in paths {
            let path = path.unwrap().path();
            if path.is_file() {
                let file_name = path.file_name().unwrap().to_str().unwrap();
                let dest = Path::new("./dist").join("styles").join(file_name);
                create_dir(dest.parent().unwrap().to_str().unwrap());
                match fs::copy(path, dest) {
                    Ok(_) => {}
                    Err(err) => {
                        println!("{:?}", err);
                    }
                }
            }
        }
    }

    fn generate_scripts(&self) {
        let paths = match fs::read_dir("./scripts") {
            Ok(paths) => paths,
            Err(_) => {
                println!("scripts ディレクトリが存在しません");
                return;
            }
        };

        for path in paths {
            let path = path.unwrap().path();
            if path.is_file() {
                let file_name = path.file_name().unwrap().to_str().unwrap();
                let dest = Path::new("./dist").join("scripts").join(file_name);
                create_dir(dest.parent().unwrap().to_str().unwrap());
                match fs::copy(path, dest) {
                    Ok(_) => {}
                    Err(err) => {
                        println!("{:?}", err);
                    }
                }
            }
        }
    }

    fn posts_template(&self, content: String) -> String {
        render! {
        <html lang="en">
            <head>
                <title>home | blog.takurinton.dev</title>
                <meta charset="utf-8"></meta>
                <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
                <link
                    rel="shortcut icon"
                    href="https://takurinton.dev/favicon.ico"
                    type="image/x-icon"
                ></link>
                <link rel="stylesheet" href="/styles/root.css"></link>
                <link rel="stylesheet" href="/styles/index.home.css"></link>
                <meta name="twitter:card" content="summary"></meta>
                <meta property="og:url" content="https://blog.takurinton.dev/"></meta>
                <meta property="og:image" content="https://takurinton.dev/me.jpeg"></meta>
                <meta property="twitter:url" content="https://blog.takurinton.dev/"></meta>
                <meta property="twitter:image" content="https://takurinton.dev/me.jpeg"></meta>
                <meta name="description" content="takurinton blog"></meta>
            </head>
            <body>
                <header class="header">
                    <a class="header-title" href="/">
                    blog.takurinton.dev
                    </a>
                </header>
                <section class="home">
                    <div class="headingcontainer">
                    <h1 class="heading">記事一覧</h1>
                    </div>
                    {content}
                </section>
                <script type="module" src="/scripts/index.js"></script>
            </body>
        </html>
              }
        .to_string()
    }

    fn post_template(
        &self,
        content: String,
        title: String,
        created_at: String,
        raw_markdown: String,
    ) -> String {
        render! {
        <html lang="en">
            <head>
                <title>{title} | blog.takurinton.dev</title>
                <meta charset="utf-8"></meta>
                <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
                <link
                    rel="shortcut icon"
                    href="https://takurinton.dev/favicon.ico"
                    // type="image/x-icon"
                ></link>
                <link rel="stylesheet" href="/styles/root.css"></link>
                <link rel="stylesheet" href="/styles/index.post.css"></link>
                <meta name="twitter:card" content="summary"></meta>
                <meta property="og:title" content={title.clone()}></meta>
                <meta property="og:url" content="https://blog.takurinton.dev/"></meta>
                <meta property="og:image" content="https://takurinton.dev/me.jpeg"></meta>
                <meta property="twitter:url" content="https://blog.takurinton.dev/"></meta>
                <meta property="twitter:image" content="https://takurinton.dev/me.jpeg"></meta>
                <meta name="description" content="takurinton blog"></meta>

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/atom-one-dark.min.css"></link>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"></script>

                <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/go.min.js"></script>

                <script>hljs.highlightAll();</script>
            </head>
            <body>
                <header class="header">
                    <a class="header-title" href="/">
                        blog.takurinton.dev
                    </a>
                </header>
                <div class="content">
                    <h1 class="title">{title}</h1>
                    <p class="date">{created_at}</p>
                    <div class="post-body">{content}</div>
                </div>
                <div id="raw-markdown" style="display:none">{raw_markdown}</div>
                <script type="module" src="/scripts/index.js"></script>
                <script type="module" src="/scripts/wasm-hydrate.js"></script>
            </body>
        </html>
    }.to_string()
    }

    fn generate_posts(&self, md_files: Vec<String>) {
        let mut html = String::new();
        // ファイル名を数字にしてソート
        let mut md_files = md_files
            .iter()
            .map(|file| {
                let id = file.replace(".md", "").parse::<i32>().unwrap();
                (id, file)
            })
            .collect::<Vec<(i32, &String)>>();
        md_files.sort_by(|a, b| b.0.cmp(&a.0));
        for md_file in md_files {
            let md_file = md_file.1;
            let md = match fs::read_to_string(Path::new("./posts").join(&md_file)) {
                Ok(md) => md,
                Err(_) => {
                    println!("{} ファイルが読み込めません", md_file);
                    continue;
                }
            };

            let frontmatter = markdown::get_frontmatter(&md);
            let id = match frontmatter.get("id") {
                Some(id) => id.to_string(),
                None => {
                    println!("{} IDが取得できません", md_file);
                    continue;
                }
            };
            let title = match frontmatter.get("title") {
                Some(title) => title.to_string(),
                None => {
                    println!("{} タイトルが取得できません", md_file);
                    continue;
                }
            };
            let created_at = match frontmatter.get("created_at") {
                Some(created_at) => created_at.to_string(),
                None => {
                    println!("{} 作成日が取得できません", md_file);
                    continue;
                }
            };

            let md = markdown::remove_frontmatter(&md);
            let rendered_html = markdown_to_html(&md);
            let content = markdown::html_to_string(rendered_html);
            let content = truncate_to_char_boundary(&content, 300);

            html.push_str(
                render! {
                    <div class="post">
                        <a class="post-title" href={format!("/post/{}/index.html", id)}>{title}</a>
                        <p class="date">{created_at}</p>
                        <p class="description">{content}</p>
                    </div>
                }
                .to_string()
                .as_str(),
            );
        }
        html = self.posts_template(html);

        let path = Path::new("./dist").join("index.html");
        create_dir(path.parent().unwrap().to_str().unwrap());
        match fs::write(path, html) {
            Ok(_) => {}
            Err(err) => {
                println!("{:?}", err);
            }
        }

        println!("created: dist/index.html");
    }

    fn generate_post(&self, md_files: Vec<String>) {
        for md_file in md_files {
            let md = match fs::read_to_string(Path::new("./posts").join(&md_file)) {
                Ok(md) => md,
                Err(_) => {
                    println!("{} ファイルが読み込めません", md_file);
                    continue;
                }
            };

            let frontmatter = markdown::get_frontmatter(&md);
            let title = match frontmatter.get("title") {
                Some(title) => title.to_string(),
                None => {
                    println!("{} タイトルが取得できません", md_file);
                    continue;
                }
            };
            let created_at = match frontmatter.get("created_at") {
                Some(created_at) => created_at.to_string(),
                None => {
                    println!("{} 作成日が取得できません", md_file);
                    continue;
                }
            };

            let md = markdown::remove_frontmatter(&md);
            let html = markdown_to_html(&md);
            let escaped_md = html_escape(&md);
            let html = self.post_template(html, title, created_at, escaped_md);

            let pathname = md_file.replace(".md", "");
            let path = Path::new(format!("./dist/post/{}", pathname).as_str()).join("index.html");
            create_dir(path.parent().unwrap().to_str().unwrap());
            match fs::write(path, html) {
                Ok(_) => {}
                Err(err) => {
                    println!("{:?}", err);
                    continue;
                }
            }
            println!(
                "created: posts/{} -> dist/{}",
                md_file,
                format!("post/{}/index.html", pathname)
            );
        }
    }

    fn generate_rss(&self, md_files: Vec<String>) {
        let rss_feed = md_files
            .iter()
            .map(|md_file| {
                let md = match fs::read_to_string(Path::new("./posts").join(md_file)) {
                    Ok(md) => md,
                    Err(_) => {
                        println!("{} ファイルが読み込めません", md_file);
                        return String::new();
                    }
                };

                let frontmatter = markdown::get_frontmatter(&md);
                let title = match frontmatter.get("title") {
                    Some(title) => title.to_string(),
                    None => {
                        println!("{} タイトルが取得できません", md_file);
                        return String::new();
                    }
                };
                let created_at = match frontmatter.get("created_at") {
                    Some(created_at) => created_at.to_string(),
                    None => {
                        println!("{} 作成日が取得できません", md_file);
                        return String::new();
                    }
                };
                let description = match frontmatter.get("description") {
                    Some(description) => description.to_string(),
                    None => {
                        println!("{} 説明が取得できません", md_file);
                        return String::new();
                    }
                };

                render! {
                    <item>
                        <title>{title}</title>
                        <link>{format!("https://blog.takurinton.dev/post/{}/index.html", md_file.replace(".md", ""))}</link>
                        <description>{description}</description>
                        <pubDate>{created_at}</pubDate>
                    </item>
                }.to_string()

            })
            .collect::<String>();

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
            Ok(_) => {
                println!("created: dist/rss.xml");
            }
            Err(err) => {
                println!("{:?}", err);
            }
        }
    }

    fn generate(&self, md_files: Vec<String>) {
        self.generate_posts(md_files.clone());
        self.generate_post(md_files.clone());
        self.generate_rss(md_files.clone());
    }
}

fn html_escape(s: &str) -> String {
    s.replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
}

fn truncate_to_char_boundary(s: &str, max_chars: usize) -> String {
    s.char_indices()
        .nth(max_chars)
        .map(|(idx, _)| &s[..idx])
        .unwrap_or(s)
        .to_string()
}

fn main() {
    let generator = HtmlGenerator;
    let md_files = generator.get_md_files();
    generator.generate_styles();
    generator.generate_scripts();
    generator.generate(md_files)
}
