# Claude 全体方針

## 変更の反映方法

### ブランチとPR

- **いかなる変更も `main` に直接コミット・プッシュしない**
- 作業対象がこのリポジトリでも外部リポジトリ（例: `takurinton/chat`）でも同様
- GitHub API (`gh api ... --method PUT`) でファイルを作成・更新する場合も、事前にブランチを切ってから操作する

外部リポジトリへの変更例：
```bash
# ブランチを作成してからファイルを作成する
gh api repos/owner/repo/git/refs \
  --method POST \
  --field ref="refs/heads/feat/branch-name" \
  --field sha="<base-sha>"

gh api repos/owner/repo/contents/path/to/file \
  --method PUT \
  --field message="feat: 説明" \
  --field content="<base64>" \
  --field branch="feat/branch-name"

gh pr create --repo owner/repo --head feat/branch-name --title "..." --body "..."
```

### 確認が必要なケース

- `main` への直接変更を求められた場合は、ブランチ経由に切り替えて進める
- 外部リポジトリへの変更は必ず PR として出し、マージはユーザーに委ねる
