import { prerender as ssr } from "preact-iso";
import { toStatic } from "hoofd/preact";

export function prerender(vnode) {
  const res = ssr(vnode);

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
