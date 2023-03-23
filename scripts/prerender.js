import { Worker } from "worker_threads";
import { prerender as ssr } from "preact-iso";
import { toStatic } from "hoofd/preact";

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
    const res = await ssr(vnode);

    const head = toStatic();
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

  const cwd = ".";
  const out = ".cache";
  const publicPath = `./public`;

  const path = require("path");
  const fs = require("fs").promises;

  // const isCacheDirExists = await fs
  //   .access(path.resolve(cwd, out))
  //   .then(() => true)
  //   .catch(() => false);
  // if (!isCacheDirExists) {
  //   await fs.mkdir(path.resolve(cwd, out));
  // }

  // await fs.writeFile(
  //   path.resolve(cwd, out, "package.json"),
  //   '{"type":"module"}'
  // );

  const template = await fs.readFile(
    path.resolve("./dist", "index.html"),
    "utf-8"
  );

  const match = /<script(?:\s[^>]*?)?\s+src=(['"]?)([^>]*?)\1(?:\s[^>]*?)?>/g
    .exec(template)[2]
    .replace(publicPath, "")
    .replace(/^(\.?\/)?/g, "");

  // fs.copyFile(`./dist/${match}`, path.resolve(cwd, out, match));

  // 最終的な script
  // file splitting はしてないので単一ファイルでいい
  const script = path.resolve("./dist", match);

  delete globalThis.fetch;
  globalThis.fetch = async (url) => {
    const text = () =>
      fs.readFile(`./dist/${String(url).replace(/^\//, "")}`, "utf-8");
    return { text, json: () => text().then(JSON.parse) };
  };

  const res = await _prerender(require(script).default);
  console.log(res);
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
