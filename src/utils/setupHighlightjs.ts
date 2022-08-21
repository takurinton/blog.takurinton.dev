// bundle に混ぜ込むと謎にエラーになるので、分ける
// この命令的なコードが俺の技術力の低さの証明になっている気がしてならない、こんなことしてないでバンドルチューニングをすればいいだけでは
export const setupHighlightjs = () => {
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
