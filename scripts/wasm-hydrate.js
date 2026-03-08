import init, { render_markdown } from '/scripts/pkg/wasm.js';

async function hydrate() {
  await init('/scripts/pkg/wasm_bg.wasm');

  const rawEl = document.getElementById('raw-markdown');
  if (!rawEl) return;

  const markdown = rawEl.textContent;
  const html = render_markdown(markdown);

  const postBody = document.querySelector('.post-body');
  if (!postBody) return;

  postBody.innerHTML = html;
}

hydrate();
