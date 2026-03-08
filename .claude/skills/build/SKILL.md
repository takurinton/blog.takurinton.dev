---
name: build
description: ブログをビルドして dist/ に HTML を生成する
---

# Build - ブログビルド

`cargo run` を実行して `posts/` の Markdown から `dist/` に HTML を生成する。

## 実行コマンド

```bash
cargo run
```

## 生成物

- `dist/index.html` - 記事一覧ページ
- `dist/post/<id>/index.html` - 各記事ページ
- `dist/rss.xml` - RSSフィード
- `dist/styles/` - コピーされたCSS
- `dist/scripts/` - コピーされたJS

## ビルドの流れ

1. `generator` クレートが `posts/*.md` を読み込む
2. `markdown` クレートでフロントマターをパース、本文をHTMLに変換
3. `app` クレートの `render!` proc-macroでHTMLテンプレートを生成
4. `dist/` に書き出す

## エラー時の対処

| エラー | 対処 |
|--------|------|
| `posts ディレクトリが存在しません` | `posts/` ディレクトリがあるか確認 |
| `cargo: command not found` | Rustツールチェーンをインストール |
| フロントマターが読み取れない | `posts/<id>.md` のフロントマター形式を確認（`id/title/description/created_at` が必須） |
| コンパイルエラー | `cargo check` でエラー詳細を確認 |

## CI での確認

GitHub Actions の `test.yaml` では以下が自動実行される：
- `cargo check`
- `cargo fmt --check`
- `cargo test`

デプロイは `deploy.yaml` で `cargo run` → Vercel へのデプロイ。
