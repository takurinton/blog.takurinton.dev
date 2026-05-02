---
name: create-pr
description: ブランチを切ってプルリクエストを作成する
---

# Create PR - ブランチ & プルリクエスト作成

`$ARGUMENTS` の内容に基づいてブランチを切り、変更を加えてプルリクエストを作成する。

## 手順

1. **現状確認**
   ```
   git status
   git branch
   ```
   未コミットの変更がある場合は `git stash` で退避する。

2. **main を最新に更新してからブランチ作成**
   - **必ず** main に戻って pull してから新規ブランチを切る
   - 作業中のブランチがあっても、そのまま使わない
   ```
   git checkout main
   git pull origin main
   git checkout -b feat/branch-name
   ```
   - ブランチ名は `feat/`, `fix/`, `chore/` などのプレフィックスを付ける
   - 英数字・ハイフンのみ使用（日本語不可）

3. **変更を実施**
   - 指定されたタスクを実装する

4. **コミット**
   ```
   git add -A
   git commit -m "type: 変更内容の説明"
   ```
   コミットメッセージは Conventional Commits 形式（feat / fix / chore / docs / refactor）。

5. **プッシュ**
   ```
   git push origin HEAD
   ```

6. **PR 作成**
   ```
   gh pr create \
     --repo takurinton/blog.takurinton.dev \
     --title "PRタイトル" \
     --body "## 概要\n\n変更内容の説明\n\n## 変更点\n\n- 変更1\n- 変更2"
   ```

## PR 記載内容

- **タイトル:** 変更内容を簡潔に（日本語OK）
- **本文:**
  - 概要（何を・なぜ変更したか）
  - 変更点（箇条書き）
  - 関連 Issue（あれば `Closes #番号`）

## 注意

- `main` ブランチへの直接コミットは行わない
- PR 作成前に `gh pr list --repo takurinton/blog.takurinton.dev` で重複がないか確認する
- **作業中ブランチがあっても必ず main に戻り pull してから新規ブランチを切る**（既存ブランチを流用しない）
