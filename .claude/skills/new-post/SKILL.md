---
name: new-post
description: 新しいブログ記事を作成する
---

# New Post - ブログ記事作成

`$ARGUMENTS` のタイトル・内容に基づいて新しいブログ記事を `posts/` に作成する。

## フロントマター形式

```markdown
---
id: <記事ID>
title: <タイトル>
description: <説明（1〜2文）>
created_at: <作成日 YYYY-MM-DD>
---

# 本文...
```

## 手順

1. **次のIDを確認する**
   - `posts/` ディレクトリ内のファイル名（数字.md）を確認し、最大値 + 1 を新しいIDとする
   ```
   ls posts/
   ```

2. **記事ファイルを作成する**
   - ファイル名: `posts/<id>.md`
   - フロントマターをすべて埋める
   - `created_at` は今日の日付（YYYY-MM-DD形式）
   - `description` は記事の内容を1〜2文で要約したもの

3. **ビルドして確認する**
   ```
   cargo run
   ```
   - `dist/post/<id>/index.html` が生成されることを確認
   - `dist/index.html` の記事一覧に追加されることを確認

4. **コミット & PR**（必要な場合）
   ```
   git checkout -b feat/post-<id>
   git add posts/<id>.md
   git commit -m "feat(post): <タイトル>"
   git push origin HEAD
   gh pr create \
     --repo takurinton/blog.takurinton.dev \
     --title "feat(post): <タイトル>" \
     --body "## 概要\n\n新しいブログ記事を追加した。\n\n- ID: <id>\n- タイトル: <タイトル>"
   ```

## 注意

- `id` は連番で必ず整数。既存のIDと重複しないこと
- `description` はRSSフィードにも使われるため、内容を適切に要約する
- `dist/` はビルド成果物のため git には含めない（.gitignore 確認）
