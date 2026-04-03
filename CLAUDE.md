# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 行動原則

- **ユーザーの指示を最優先**: ユーザーが具体的な手順・順番を指示した場合、その通りに実行する。自己判断で順序を変えたり、勝手に追加作業をしない
- **指示を正確に聞く**: 「先に○○して」「まず△△を消して」のような指示が来たら、他の作業を中断してその指示を即座に実行する
- **確認せず即実行**: 明確な指示に対して「〜しましょうか？」と聞き返さない。やれと言われたらやる
- **余計なことをしない**: 頼まれていない作業（ファイルの調査、関連コードの読み込み等）を先回りでやらない。指示された範囲だけを実行する

## Build & Test Commands

```bash
# テスト・チェック
cargo test                    # 全テスト実行
cargo test -p markdown        # 特定クレートのみ
cargo fmt --check             # フォーマットチェック
cargo check                   # コンパイルチェック

# ビルド
cargo run -p generator        # SSG実行 → dist/ に出力
wasm-pack build site/ --target web --out-dir ../dist/scripts/pkg/  # WASMビルド
```

## コーディング

- `cargo fmt` を必ずコミット前に実行する
- `cargo test` でテストが通ることを確認してからコミットする
- 不要な未追跡ファイルはコミット前に削除する

## Architecture

Rust workspace による静的サイトジェネレータ + WASM クライアントフレームワーク。

```
posts/*.md → generator (SSR) → dist/*.html
                                  ↓ ブラウザ
                              wasm (client-side routing, reactivity)
```

### Workspace Members

| Crate | Type | 役割 |
|-------|------|------|
| **markdown** | lib | Markdown→HTML 変換。lexer, tokenizer, generator で処理 |
| **app** | proc-macro | `render!` マクロ（SSR/Client デュアルモード）と `#[component]` マクロ |
| **generator** | bin | SSG。`posts/*.md` を読み、`dist/` にHTML・RSS生成 |
| **wasm** | cdylib | Signal, Bindable, Router によるクライアントサイド SPA |

### render! マクロのデュアルモード

- **native target**: SSR パス — `String` を組み立てるコード生成（`codegen/ssr.rs`）
- **wasm32 target**: Client パス — `web_sys` で DOM 要素を生成（`codegen/client.rs`）

### Content

- ブログ記事: `posts/{id}.md`（YAML frontmatter: id, title, description, created_at）
- 生成先: `dist/index.html`, `dist/post/{id}/index.html`, `dist/rss.xml`
- 静的ファイル: `styles/`, `scripts/` → `dist/` にコピー

## コミュニケーション

- 冗長な説明を避け、端的に答える
- 作業中に問題が起きた場合のみ報告する
- 成功した場合は結果だけ伝える
