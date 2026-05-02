---
name: update-readme
description: README.md をコードベースの現状に合わせて更新する
---

# Update README

README.md をコードベースの現状に合わせて更新する。

## 調査手順

1. **現在の README を読む**
   ```
   Read README.md
   ```

2. **コードベースの現状を調査する**
   - `Cargo.toml` (workspace) でクレート構成を確認
   - `markdown/src/lib.rs` でMarkdownパーサーのAPI確認
   - `app/src/lib.rs` でproc-macroの確認
   - `generator/src/main.rs` でビルド処理の確認
   - `posts/` のフロントマター形式を確認
   - `.github/workflows/` でCI/CDの確認

3. **差分を確認する**
   - README に記載されていない機能・構造がないか確認
   - 実態と異なる記述がないか確認

## 更新内容

以下の項目が現状と一致しているか確認・更新する：

- プロジェクト概要（静的ブログジェネレーター）
- クレート構成（`markdown` / `app` / `generator`）
- ブログ記事のフロントマター形式
- ビルド方法（`cargo run`）
- テスト方法（`cargo test`）
- デプロイ先（Vercel）
- ディレクトリ構成

## コミット & PR

```
git checkout -b docs/update-readme
git add README.md
git commit -m "docs: README を最新の構成に更新"
git push origin HEAD
gh pr create \
  --repo takurinton/blog.takurinton.dev \
  --title "docs: README を最新の構成に更新" \
  --body "## 概要\n\nコードベースの現状に合わせて README を更新した。\n\n## 変更点\n\n- <変更内容>"
```

## 注意

- コードから読み取った事実のみ記載する
- 日本語で記述する
- 変更がない場合はコミットしない
