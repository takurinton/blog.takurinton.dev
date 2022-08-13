import { useState } from "preact/hooks";

const CACHE = new Map();

async function fetchPost(url) {
  const mdStr = await fetch(url).then((res) => res.text());
  let meta = {};
  return { mdStr, meta };
}

export function usePost(id: string): { mdStr: string; meta: any } {
  const url = `/contents/${id}.md`;
  let update = useState(0)[1];
  let post = CACHE.get(url);
  if (!post) {
    post = fetchPost(url);
    CACHE.set(url, post);
    post.then(
      (value) => update((post.value = value)),
      (error) => update((post.error = error))
    );
  }

  if (post.value) return post.value;
  if (post.error) throw post.error;
  throw post;
}
