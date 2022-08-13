import { useRoute } from "preact-iso";
import styles from "./style.module.css";
import { useMeta, useScript, useTitle } from "hoofd/preact";
import { MarkdownInit, markdown } from "../../../src/md";
import { usePost } from "../../../src/hooks/usePost";
import { useEffect } from "preact/hooks";

// bundle に混ぜ込むと謎にエラーになるので、分ける
// この命令的なコードが俺の技術力の低さの証明になっている気がしてならない、こんなことしてないでバンドルチューニングをすればいいだけでは
const highlightJsSetup = () => {
  const highlightjs = document.getElementById("highlightjs");
  const highlightcss = document.getElementById("highlightcss");
  const hljsScript = document.getElementById("hljsScript");
  if (highlightjs !== null) {
    document.head.removeChild(highlightjs);
  }
  if (highlightcss !== null) {
    document.head.removeChild(highlightcss);
  }
  if (hljsScript !== null) {
    document.head.removeChild(document.getElementById("hljsScript"));
  }

  const script = Object.assign(document.createElement("script"), {
    id: "highlightjs",
    src: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js",
    async: true,
    type: "text/javascript",
  });
  const style = Object.assign(document.createElement("link"), {
    id: "highlightcss",
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/atom-one-dark.min.css",
  });
  document.head.appendChild(script);
  document.head.appendChild(style);

  script.addEventListener("load", () => {
    const hljsScript = Object.assign(document.createElement("script"), {
      id: "hljsScript",
      innerHTML: `hljs.highlightAll();`,
    });
    document.head.appendChild(hljsScript);
  });
};

export default function Post() {
  const { params } = useRoute();
  const { mdStr } = usePost(params.id);
  const md = new MarkdownInit(mdStr);

  const title = md.getTitle();
  const content = markdown(md.getContent());
  const createdAt = md.getCreatedAt();
  const description = `${title} について書きました。`;
  useTitle(title);
  useMeta({ property: "og:title", content: `takurinton | ${title}` });
  useMeta({ property: "twitter:title", content: `takurinton | ${title}` });
  useMeta({ property: "og:description", content: description });
  useMeta({ property: "twitter:description", content: description });

  useEffect(() => {
    highlightJsSetup();
  }, []);

  return (
    <div style={{ padding: "10%" }}>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <p style={{ textAlign: "right" }}>{createdAt}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
