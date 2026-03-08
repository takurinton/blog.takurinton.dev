---
name: test
description: テストを実行する
---

# Test - テスト実行

Rust ワークスペース全体のテストを実行する。

## 実行コマンド

```bash
# テスト実行
cargo test

# フォーマットチェック
cargo fmt --check

# 静的解析
cargo clippy -- -D warnings

# 型・依存チェック
cargo check
```

## テストファイル

- `app/tests/lib.rs` - proc-macro のテスト

## CI と同じチェックを手元で行う場合

```bash
cargo check --verbose
cargo fmt --check
cargo test --verbose
```

## テスト追加の方針

- `markdown` クレートの関数（`get_frontmatter`, `remove_frontmatter`, `markdown_to_html` など）に対してユニットテストを追加する場合は `markdown/src/lib.rs` の `#[cfg(test)]` モジュールに書く
- `app` クレートのproc-macroテストは `app/tests/lib.rs` に書く
