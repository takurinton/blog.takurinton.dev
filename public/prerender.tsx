import { prerender as ssr } from "preact-iso";
import { VNode } from "preact";
import { toStatic } from "hoofd/preact";

let initialized = false;
async function init() {
  globalThis.DOMParser = new (require("jsdom").JSDOM)("").window.DOMParser;
}

export async function prerender(vnode: VNode) {
  if (!initialized) {
    initialized = true;
    await init();
  }

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
