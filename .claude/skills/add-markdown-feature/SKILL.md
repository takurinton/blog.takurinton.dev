---
name: add-markdown-feature
description: Markdownパーサーまたはジェネレーターに新機能を追加する
---

# Add Markdown Feature - Markdown/ジェネレーター機能追加

`$ARGUMENTS` の内容に基づいて、Markdownパーサー・HTMLジェネレーターに新しい機能を追加する。

## クレート構成

```
blog.takurinton.dev/
├── markdown/        # Markdownパーサーライブラリ
│   └── src/
│       ├── lib.rs       # パブリックAPI (get_frontmatter, remove_frontmatter, markdown_to_html 等)
│       ├── mod.rs
│       ├── lexer/       # 字句解析
│       ├── token/       # トークン定義
│       ├── tokenizer/   # トークナイザー
│       └── generator/   # HTML生成
├── app/             # proc-macro (render! マクロ)
│   └── src/
│       ├── lib.rs
│       └── parser/
├── generator/       # ビルドバイナリ
│   └── src/
│       └── main.rs  # HTMLテンプレート・ファイル出力
└── posts/           # Markdownブログ記事
```

## 機能追加の判断基準

| 追加したい機能 | 変更するクレート |
|----------------|-----------------|
| 新しいMarkdown記法のパース | `markdown` (lexer/tokenizer/generator) |
| フロントマターの新フィールド | `markdown/src/lib.rs` の `get_frontmatter` |
| HTMLテンプレートの変更 | `generator/src/main.rs` |
| ページの追加（例: タグページ） | `generator/src/main.rs` |
| OGカードや埋め込み記法 | `markdown` + `scripts/index.js` |
| CSSスタイルの変更 | `styles/` |

## 手順

1. **影響クレートを特定する**
2. **該当ファイルを Read して現状を把握する**
3. **変更を実装する**
4. **ビルドして確認する**
   ```bash
   cargo build
   cargo run  # dist/ への出力確認
   ```
5. **テストを追加・実行する**
   ```bash
   cargo test
   ```
6. **PR を作成する**（`/create-pr` スキルを使う）

## 注意

- `markdown` クレートは独立したライブラリとして設計されている。`generator` 固有の都合で `markdown` に依存を追加しない
- `app` クレートは proc-macro のため、通常のコードとは異なるコンパイルフェーズで動く
- フロントマターの必須フィールドは `id`, `title`, `description`, `created_at`。新フィールドを追加する場合は既存記事への影響を確認する
