---
name: improve-skill
description: フィードバックを受け取り、.claude配下のskillや設定を自己改善する
---

# Improve Skill - 自己成長skill

`$ARGUMENTS` に含まれるフィードバックを解析し、`.claude/` 配下のファイルを改善する。

## 入力フォーマット

```
/improve-skill [評価（1〜5）] [フィードバック文章]
```

例:
```
/improve-skill 3 create-prのブランチ命名規則が曖昧でわかりにくい
/improve-skill 5 new-postが完璧に動いた
/improve-skill 2 buildスキルにエラー時の対処法が書かれていない
```

## 手順

1. **引数を解析する**
   - 先頭の数字（1〜5）を評価として取り出す
   - 残りのテキストをフィードバック内容として取り出す
   - 数字がない場合は評価なしとして扱い、フィードバック全体を内容とする

2. **影響範囲を特定する**
   フィードバック内容を読み、どの対象に関するものかを判断する：
   - 特定のskill名が含まれる → 該当の `.claude/skills/<name>/SKILL.md` を更新
   - hook・フォーマット・コミットに関する → `.claude/hooks/` 配下を確認・更新
   - 全体的な構成・ガイドに関する → `.claude/README.md` を確認・更新

3. **現状を読む**
   対象ファイルを Read して内容を把握する。

4. **改善を適用する**

   - 評価が **4〜5** の場合：現状維持 or 成功パターンをより明確に文書化
   - 評価が **3** の場合：曖昧な記述を具体化・補足を追加
   - 評価が **1〜2** の場合：問題のある記述を修正・削除・書き直し

   改善の方向性：
   - 具体的な手順・例を追加する
   - 曖昧な表現を明確化する
   - 不足している注意事項を追記する
   - 冗長な記述を削除してシンプルにする

5. **変更をコミット & PRを作成する**
   ```
   git checkout -b chore/improve-skill-feedback
   git add .claude/
   git commit -m "chore(skill): フィードバックに基づくskill改善

   評価: <評価>/5
   内容: <フィードバック概要>"
   git push origin HEAD
   gh pr create \
     --repo takurinton/blog.takurinton.dev \
     --title "chore(skill): フィードバックに基づくskill改善" \
     --body "## 概要\n\nフィードバックを受けて .claude/ 配下を改善した。\n\n## フィードバック\n\n- 評価: <評価>/5\n- 内容: <フィードバック内容>\n\n## 変更点\n\n- <変更したファイルと内容>"
   ```

## 注意

- フィードバックが特定のskillに関係しない場合はユーザーに確認する
- 評価4〜5でも改善余地があればフィードバック内容に応じて更新してよい
- `.claude/settings.json` は変更しない
- 変更はPRとして出し、直接mainにコミットしない
