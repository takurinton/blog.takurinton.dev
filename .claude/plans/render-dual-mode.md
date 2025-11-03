# render! デュアルモード化 + WASM クライアントフレームワーク

## Context

現行の `render!` proc-macro は SSG 専用（String 生成）。これを拡張し、同じ `render!` 構文で SSG（renderToString 相当）と WASM クライアント（hydration 相当）の両方を実現する。vdom は使わず Svelte 式のコンパイル時コード生成で imperative DOM 操作を行う。

## 方針

`render!` マクロが `#[cfg(target_arch = "wasm32")]` で分岐する 2 つのコードパスを生成する。

- **native target（generator）**: 現行の String building → `String` を返す
- **wasm32 target（wasm crate）**: imperative DOM 操作 → `web_sys::Element` を返す

generator は native-only、wasm crate は wasm32-only なので戻り値型の違いは問題にならない。

リアクティブは `Bindable` trait でディスパッチ。proc-macro は型情報を持てないが、生成コードで `Bindable::bind(expr, &text_node)` を呼ぶことで String には no-op、Signal<T> には subscribe が走る。

---

## Phase 1: render! macro リファクタリング

### 1-1. Tokenizer 抽出 → `app/src/tokenizer.rs`

`app/src/lib.rs` から以下を移動:
- `Attribute` struct (L13-25) + impl
- `Token` enum (L29-50) — `#[derive(Clone)]` を追加
- `Tokenizer` struct + impl (L53-197)
- `Render` struct + `Parse` impl (L200-237)
- `Parse for Token` impl (L216-237)

`lib.rs` には `mod tokenizer; mod codegen;` と `render!` エントリポイントのみ残す。

### 1-2. SSR codegen → `app/src/codegen/ssr.rs`

`Parser::create_node` (L253-316) を `pub fn generate(tokens: Vec<Token>) -> TokenStream` として移動。動作は現行と完全に同一（String push）。

### 1-3. Client codegen → `app/src/codegen/client.rs`

`pub fn generate(tokens: Vec<Token>) -> TokenStream` を新規作成。

**コード生成戦略:**
- マクロ展開時に要素スタックを管理（`__el_0`, `__el_1`, ...）
- `Open` → `create_element` + `set_attribute` + スタック push
- `Close` → スタック pop（生成コードには何も出さない。append_child は Open 時に親へ）
- `Text` → `create_text_node` + `append_child`
- `Braced { block }` → `create_text_node("")` + `Bindable::bind(#block, &__t)` + `append_child`

生成コードの形:
```rust
{
    let __doc = ::web_sys::window().unwrap().document().unwrap();
    let __el_0 = __doc.create_element("div").unwrap();
    __el_0.set_attribute("class", &::std::string::ToString::to_string(&("foo"))).unwrap();
    let __t_0 = __doc.create_text_node("");
    ::wasm::Bindable::bind(title, &__t_0);
    __el_0.append_child(&__t_0).unwrap();
    __el_0
}
```

### 1-4. render! エントリポイント更新 → `app/src/lib.rs`

```rust
#[proc_macro]
pub fn render(input: proc_macro::TokenStream) -> proc_macro::TokenStream {
    let parsed = parse_macro_input!(input as tokenizer::Render);
    let tokens = parsed.tokens;
    let ssr = codegen::ssr::generate(tokens.clone());
    let client = codegen::client::generate(tokens);
    quote! {{
        #[cfg(not(target_arch = "wasm32"))]
        { #ssr }
        #[cfg(target_arch = "wasm32")]
        { #client }
    }}.into()
}
```

### 1-5. 不要依存の除去

`app/Cargo.toml` から `wasm-bindgen`, `js-sys`, `web-sys` を削除（proc-macro は host で実行される。生成コードで参照する `web_sys` は using crate 側で解決）。

### 1-6. `app/src/parser/mod.rs` 削除

未使用のスケルトン。役割は `codegen/client.rs` に引き継がれた。

### 1-7. テスト

- 既存 6 テスト（`app/tests/lib.rs`）が全パス。native target なので SSR パスのみ実行。
- `codegen/client.rs` に unit test 追加: 手動構築した `Vec<Token>` を渡して生成 TokenStream に `create_element`, `set_attribute`, `create_text_node` が含まれることを assert。

### コミット

| # | 内容 |
|---|------|
| 1 | `tokenizer.rs` 抽出 + `codegen/ssr.rs` 移動。既存テスト全パス |
| 2 | `codegen/client.rs` 追加 + `lib.rs` cfg 分岐 + `parser/mod.rs` 削除 + deps 整理 |

---

## Phase 2: WASM クライアントフレームワーク

### 2-1. `#[component]` を app crate に統合

`wasm-macro/src/lib.rs` の内容を `app/src/component.rs` に移動:
- `Transformer`, `extract_ident`, `mut_ident_from_pat`, `remove_mut_from_pat`, `compound_to_binop`
- `app/Cargo.toml` の syn features に `"visit-mut"` 追加
- `lib.rs` に `mod component;` + `#[proc_macro_attribute] pub fn component` エントリポイント追加
- Signal import パスを `use wasm::Signal;` に変更（wasm crate の pub re-export を想定）

### 2-2. wasm crate セットアップ → `wasm/`

```
wasm/
  Cargo.toml          # cdylib, deps: wasm-bindgen, wasm-bindgen-futures,
                      # web-sys (features 後述), js-sys, markdown, app
  src/
    lib.rs            # pub mod signal/reactive/router; boot()
    signal.rs         # Signal, Derived, effect（既存を流用）
    reactive.rs       # Bindable trait
    router.rs         # SPA Router（既存を流用）
```

web-sys features: `Window`, `Document`, `Element`, `HtmlElement`, `HtmlAnchorElement`, `Node`, `Text`, `Event`, `MouseEvent`, `EventTarget`, `History`, `Location`, `Response`

### 2-3. Bindable trait → `wasm/src/reactive.rs`

```rust
pub trait Bindable {
    fn bind(self, node: &web_sys::Text);
}
```

実装:
- `impl Bindable for String` — `node.set_text_content(Some(&self))` のみ（静的）
- `impl Bindable for &str` — 同上
- `impl<T: Clone + ToString + 'static> Bindable for Signal<T>` — 初期値 set + subscribe で自動更新
- `macro_rules! impl_bindable_primitive` で `i32, i64, u32, u64, f32, f64, bool, usize` を一括実装

### 2-4. Signal に Display 追加

SSR パスで `{signal_var}` が `ToString::to_string()` で呼ばれるため:
```rust
impl<T: Clone + ToString + 'static> std::fmt::Display for Signal<T> {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.get().to_string())
    }
}
```

### 2-5. Router 調整 → `wasm/src/router.rs`

既存の router.rs をベースに:
- click インターセプト（内部リンクのみ）
- `history.pushState` + `popstate` 対応
- SPA 遷移時: fetch → markdown 抽出 → `markdown::markdown_to_html()` → DOM 更新
- `route: Signal<String>` で現在パスを管理

### 2-6. boot エントリポイント → `wasm/src/lib.rs`

```rust
#[wasm_bindgen(start)]
pub fn boot() {
    let doc = web_sys::window().unwrap().document().unwrap();
    let router = Router::new();
    router.boot(&doc);
}
```

初回ロードは SSG HTML がそのまま表示されるため、hydration は router のセットアップのみ。将来的にインタラクティブコンポーネント（カウンタ等）を追加した場合、`render!` の client パスで DOM を構築し mount する。

### 2-7. テスト

- `signal.rs`: native target で unit test（new, get, set, update, subscribe, Derived, effect）
- `#[component]` マクロ: `app/tests/` に展開結果の assert
- `reactive.rs`: Bindable trait の各 impl（native test は web_sys なしなので cfg gate）
- wasm integration: `wasm-pack test --headless --chrome`（Phase 3 で実行）

### コミット

| # | 内容 |
|---|------|
| 3 | `#[component]` を app に統合。`wasm-macro/` 削除 |
| 4 | `wasm/` crate 作成。signal.rs, reactive.rs, router.rs, lib.rs |
| 5 | client codegen で `Bindable::bind` 呼び出し生成を実装 |

---

## Phase 3: アプリケーション修正

### 3-1. Workspace 更新 → `Cargo.toml`

```toml
[workspace]
members = ["markdown", "generator", "app", "wasm"]
```

`wasm-macro` は削除済み。`wasm` は workspace に入れるが、通常の `cargo build` では native target 用にビルドされる（cdylib は native でもビルド可能）。WASM バイナリ生成は `wasm-pack` で行う。

### 3-2. Generator テンプレート更新 → `generator/src/main.rs`

- `post_template` に `<script type="module" src="/scripts/wasm-boot.js"></script>` 追加
- `posts_template` にも同様に追加（トップページも SPA ルーターが必要）
- `render! { ... }.to_string()` の呼び出しは変更なし（SSR パスが String を返すため）

### 3-3. WASM ブートスクリプト → `scripts/wasm-boot.js`

```javascript
import init from '/scripts/pkg/wasm.js';
init();  // #[wasm_bindgen(start)] の boot() が自動実行される
```

### 3-4. ビルドパイプライン

```sh
# 1. SSG ビルド
cargo run -p generator

# 2. WASM ビルド → dist/scripts/pkg/ に出力
wasm-pack build wasm/ --target web --out-dir ../dist/scripts/pkg/
```

### 3-5. CI/CD → `.github/workflows/deploy.yaml`

```yaml
steps:
  - uses: actions/checkout@v3
  - name: add wasm32 target
    run: rustup target add wasm32-unknown-unknown
  - name: install wasm-pack
    run: curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
  - name: install vercel cli
    run: npm install --global vercel@latest
  - name: build ssg
    run: cargo run -p generator
  - name: build wasm
    run: wasm-pack build wasm/ --target web --out-dir ../dist/scripts/pkg/
  - name: deploy
    run: vercel deploy --token ${{ secrets.VERCEL_TOKEN }} --prod
```

### 3-6. テスト・検証

- `cargo test` — workspace 全テスト通過
- `cargo run -p generator` — `dist/` に有効な HTML が生成される
- `wasm-pack build wasm/` — WASM バイナリが生成される
- ブラウザで `dist/index.html` を開き SPA 遷移が動作する
- SSG HTML の内容が既存と同一（script タグ追加以外）

### コミット

| # | 内容 |
|---|------|
| 6 | workspace 更新 + generator テンプレートに WASM script 追加 |
| 7 | wasm-boot.js + CI/CD 更新 |
| 8 | E2E テスト・動作確認 |

---

## 変更対象ファイル一覧

| ファイル | 操作 |
|---------|------|
| `app/src/lib.rs` | 大幅リファクタ: tokenizer 抽出、cfg 分岐、#[component] 追加 |
| `app/src/tokenizer.rs` | 新規: lib.rs から抽出 |
| `app/src/codegen/mod.rs` | 新規 |
| `app/src/codegen/ssr.rs` | 新規: 現行 Parser::create_node の移動 |
| `app/src/codegen/client.rs` | 新規: DOM 操作コード生成 |
| `app/src/component.rs` | 新規: wasm-macro から移動 |
| `app/src/parser/mod.rs` | 削除 |
| `app/Cargo.toml` | wasm deps 削除、syn visit-mut 追加 |
| `app/tests/lib.rs` | テスト追加 |
| `wasm/Cargo.toml` | 新規 |
| `wasm/src/lib.rs` | 新規: boot エントリポイント |
| `wasm/src/signal.rs` | 既存流用 + Display impl 追加 |
| `wasm/src/reactive.rs` | 新規: Bindable trait |
| `wasm/src/router.rs` | 既存流用 + 調整 |
| `wasm-macro/` | 削除（app に統合） |
| `Cargo.toml` | workspace members 更新 |
| `generator/src/main.rs` | WASM script タグ追加 |
| `scripts/wasm-boot.js` | 新規 |
| `.github/workflows/deploy.yaml` | wasm-pack ステップ追加 |

## 再利用する既存コード

| コード | パス | 用途 |
|--------|------|------|
| Tokenizer + Token enum | `app/src/lib.rs` L29-237 | tokenizer.rs にそのまま移動 |
| Parser::create_node | `app/src/lib.rs` L253-316 | codegen/ssr.rs にそのまま移動 |
| #[component] transformer | `wasm-macro/src/lib.rs` 全体 | component.rs に移動 |
| Signal / Derived / effect | `wasm/src/signal.rs` 全体 | そのまま流用 |
| Router | `wasm/src/router.rs` 全体 | 調整して流用 |
| markdown_to_html | `markdown/src/lib.rs` | 変更なし。wasm crate からも使用 |
