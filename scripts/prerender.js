import { Worker } from "worker_threads";

/**
 * worker のコード
 * @todo 関数の分割とテストを書く
 */
async function w() {
  const publicPath = `./public`;

  const path = require("path");
  const fs = require("fs").promises;

  // ESM を使うために package.json を dist に追加する
  await fs.writeFile(path.resolve("./dist/package.json"), '{"type":"module"}');

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

  // ここからは wmr の仕組みに乗っかってるだけなので後でよしなにする
  // 実装側で prerender 関数を書かないと meta タグが拾えない

  delete globalThis.fetch;
  globalThis.fetch = async (url) => {
    const text = () =>
      fs.readFile(`./dist/${String(url).replace(/^\//, "")}`, "utf-8");
    return { text, json: () => text().then(JSON.parse) };
  };

  globalThis.location = new URL("/", "http://localhost");
  // ユーザー定義の prerender 関数を import
  const userPrerender = (await import("file:///" + script)).prerender;

  let routes = [];
  // home を prerender
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

  // html に書き出す
  for (const route of routes) {
    const { path: _path, html: _html, head } = route;
    const baseHtml = template;
    let html = baseHtml;
    // let html = baseHtml.replace(
    //   /<head(?:\s[^>]*?)?>[\s\S]*?<\/head>/,
    //   `<head>${headHtml}</head>`
    // );

    html = html.replace("<title></title>", `<title>${head.title}</title>`);

    html = html.replace(
      /<body(?:\s[^>]*?)?>[\s\S]*?<\/body>/,
      `<body>${_html}</body>`
    );

    html = html.replace(
      '<script type="isodata"></script>',
      `<script src="/${match}"></script>`
    );

    const dir = path.resolve(`./dist${_path}`);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.resolve(dir, "index.html"), html, "utf-8");
  }

  // for (const post of posts) {
  //   console.log(post.head);
  // }
}

function prerender() {
  const worker = new Worker(
    `(${w})(require('worker_threads').workerData)
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
