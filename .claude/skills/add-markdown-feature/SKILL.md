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
├── app/             # proc-macro (render! + #[component] マクロ)
│   └── src/
│       ├── lib.rs           # エントリポイント（cfg 分岐）
│       ├── tokenizer.rs     # Token, Tokenizer, Render
│       ├── component.rs     # #[component] 属性マクロ（旧 wasm-macro）
│       └── codegen/
│           ├── mod.rs
│           ├── ssr.rs       # SSR コード生成（String push）
│           └── client.rs    # Client コード生成（DOM 操作）
├── wasm/            # WASM クライアントフレームワーク（cdylib）
│   └── src/
│       ├── lib.rs       # boot エントリポイント
│       ├── signal.rs    # Signal, Derived, effect
│       ├── reactive.rs  # Bindable trait
│       └── router.rs    # SPA Router
├── generator/       # SSG ビルドバイナリ
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
| クライアントサイドのインタラクション | `wasm/` (signal, reactive) |
| SPA ルーティング | `wasm/src/router.rs` |
| render! マクロの拡張 | `app/src/codegen/` (ssr.rs, client.rs) |
| #[component] マクロの拡張 | `app/src/component.rs` |

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
- `app` クレートは proc-macro のため、通常のコードとは異なるコンパイルフェーズで動く。`render!` は `#[cfg(target_arch = "wasm32")]` で SSR/Client の 2 パスを生成する
- `wasm` クレートは cdylib。native target でもビルド可能だが、WASM バイナリは `wasm-pack` で生成する
- フロントマターの必須フィールドは `id`, `title`, `description`, `created_at`。新フィールドを追加する場合は既存記事への影響を確認する
