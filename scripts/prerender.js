import { Worker } from "worker_threads";

/**
 * worker のコード
 * 現状 build は wmr を使っているのでファイルや meta タグの取得のルールは wmr に乗っかっている
 * build を rollup にするタイミングでここは書き直す
 * @memo ファイルベースルーティングにしたい
 */
async function generateStaticFiles() {
  async function _prerender(vnode) {
    const res = await (await import("preact-iso")).prerender(vnode);

    // TODO: 自前実装する
    const head = (await import("hoofd/preact")).toStatic();
    const elements = new Set([
      ...head.links.map((props) => ({ type: "link", props })),
      ...head.metas.map((props) => ({ type: "meta", props })),
      ...head.scripts.map((props) => ({ type: "script", props })),
    ]);

    return await {
      ...res,
      head: {
        title: head.title,
        lang: "en",
        elements,
      },
    };
  }

  const publicPath = `./public`;

  const path = require("path");
  const fs = require("fs").promises;

  const template = await fs.readFile(
    path.resolve("./dist", "index.html"),
    "utf-8"
  );

  const match = /<script(?:\s[^>]*?)?\s+src=(['"]?)([^>]*?)\1(?:\s[^>]*?)?>/g
    .exec(template)[2]
    .replace(publicPath, "")
    .replace(/^(\.?\/)?/g, "");

  // 最終的な script
  // file splitting はしてないので単一ファイルでいい
  const script = path.resolve("./dist", match);

  delete globalThis.fetch;
  globalThis.fetch = async (url) => {
    const text = () =>
      fs.readFile(`./dist/${String(url).replace(/^\//, "")}`, "utf-8");
    return { text, json: () => text().then(JSON.parse) };
  };

  // prerender する時に location がないとエラーになるので仮の location を設定
  // パスは現在 prerender してるページのパス
  globalThis.location = new URL("/", "http://localhost");

  const { App } = await import(script);
  const userPrerender = async (props) => await _prerender(() => App);

  let routes = [];
  // 初めに home を prerender
  const res = await userPrerender({
    ssr: true,
    url: "/",
    route: [{ url: "/" }],
  });
  const home = { path: "/", html: res.html, head: res.head };
  routes.push(home);

  // post を prerender
  const postPaths = Array.from(res.links).filter((p) => p !== "/");
  for (const url of postPaths) {
    globalThis.location = new URL(url, "http://localhost");
    const post = await userPrerender({
      ssr: true,
      url,
      route: [{ url }],
    });

    // 意図的に必要な情報だけ取得してる
    const i = { path: url, html: post.html, head: post.head };
    routes.push(i);
  }

  function headToString(element) {
    // こういう形式: [{ type: "meta", props: { name: "...", content: "..." }}]
    const { type, props } = element;
    const properties = Object.keys(props)
      .map((p) => `${p}="${props[p]}"`)
      .join(" ");

    return `<${type} ${properties}>`;
  }

  // html に書き出す
  for (const route of routes) {
    const { path: _path, html: _html, head } = route;
    // hoofd/preact 経由で取得した情報をベースになる html に差し込む
    let html = template;

    // title タグを置き換える
    html = html.replace("<title></title>", `<title>${head.title}</title>`);

    // head タグを置き換える
    let headHtml = Array.from(head.elements).map(headToString).join("");
    html = html.replace("</head>", `${headHtml}</head>`);

    // body にコンテンツを差し込む
    html = html.replace(
      /<body(?:\s[^>]*?)?>[\s\S]*?<\/body>/,
      `<body>${_html}</body>`
    );

    // JS をロードする
    html = html.replace(
      '<script type="isodata"></script>',
      `<script type="module" src="/${match}"></script>`
    );

    // 書き込む
    const dir = path.resolve(`./dist${_path}`);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.resolve(dir, "index.html"), html, "utf-8");
  }

  console.log("generated static html files");
  console.log('build finished in "dist" directory');
}

function prerender() {
  const worker = new Worker(
    `(${generateStaticFiles})(require('worker_threads').workerData)
      .then(r => require('worker_threads').parentPort.postMessage([1,r]))
      .catch(err => require('worker_threads').parentPort.postMessage([0,err && err.stack || err+'']))`,
    {
      eval: true,
      stderr: true,
    }
  );

  worker.stderr.on("data", (m) => {
    if (!/^\(node:\d+\) ExperimentalWarning:/.test(m.toString("utf-8")))
      process.stderr.write(m);
  });

  return new Promise((resolve, reject) => {
    const bubbleError = (error) => {
      reject(error);
    };
    worker.on("message", ([f, d]) => (f ? resolve(d) : bubbleError(d)));
    worker.once("error", bubbleError);
    worker.once("exit", resolve);
  });
}

(async () => {
  await prerender();
})();
