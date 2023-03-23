import { Worker } from "worker_threads";

/**
 * worker のコード
 * @todo 関数の分割とテストを書く
 */
async function w() {
  /**
   * @param {import('preact').VNode} vnode
   * @returns
   */
  async function _prerender(vnode) {
    const res = await (await import("preact-iso")).prerender(vnode);

    const head = (await import("hoofd/preact")).toStatic();
    const elements = new Set([
      ...head.links.map((props) => ({ type: "link", props })),
      ...head.metas.map((props) => ({ type: "meta", props })),
      ...head.scripts.map((props) => ({ type: "script", props })),
    ]);

    return {
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

  globalThis.location = new URL("/", "http://localhost");

  // ここらへんは wmr の仕組みに乗っかってるだけなので後で剥がす
  // 実装側で prerender 関数を書かないと meta タグが拾えない
  const p = {
    ssr: true,
    url: "/",
    route: [{ url: "/" }],
  };

  // ユーザー定義の prerender 関数を import
  const userPrerender = (await import("file:///" + script)).prerender;

  // home を prerender
  const res = await userPrerender(p);
  // TODO: ファイルを書き換える

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
    const i = { path: p, html: post.html, head: post.head.elements };
    // TODO: ファイルを書き換える
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
