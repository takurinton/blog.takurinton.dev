use app::global_css;

pub fn inject_global_styles() {
    global_css!(
        "
:root {
  --color-primary: #ff69b4;
  --color-secondary: #3391ff;
  --color-text: #222;
  --color-text-muted: #555;
  --color-bg: #fff;
  --color-border: #ccc;
  --color-code-bg: #282c34;
  --color-code-text: #fff;
  --font-mono: \"SFMono-Regular\", \"Consolas\", \"Liberation Mono\", \"Menlo\", monospace, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";
  --content-width: 720px;
}
"
    );

    global_css!(
        "
html, body {
  margin: 0;
  min-height: 100%;
  font-family: system-ui, sans-serif;
  color: var(--color-text);
  background: var(--color-bg);
}
"
    );

    global_css!(
        "
a {
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
}
a:hover {
  color: var(--color-secondary);
}
"
    );

    global_css!("img { max-width: 100%; }");

    global_css!(
        "
.language-name {
  background: var(--color-code-bg);
  width: fit-content;
  color: var(--color-code-text);
  padding: 4px 8px;
  margin-bottom: -18px;
  border-radius: 8px 8px 0 0;
}
"
    );

    global_css!(
        "
pre {
  font-size: 16px;
  overflow: auto;
  border-radius: 0 8px 8px 8px;
  box-shadow: 2px 2px 6px rgb(255 255 255 / 25%);
}
"
    );

    global_css!(
        "
pre > code {
  font-weight: 400;
  color: var(--color-code-text);
  font-family: var(--font-mono);
}
"
    );

    global_css!(
        "
code {
  font-weight: 400;
  color: var(--color-text);
  font-family: var(--font-mono);
}
"
    );
}
