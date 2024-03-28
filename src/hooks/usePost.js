import { useState } from "preact/hooks";
import { markdown, MarkdownInit } from "src/md";

const CACHE = new Map();

/**
 * @param {string | undefined} url
 * @returns {Promise<{mdStr: string, meta: {}}>}
 */
async function fetchPost(url) {
  const mdStr = await fetch(url).then((res) => res.text());
  const meta = {};
  return { mdStr, meta };
}

/**
 * get post data from markdown file
 *
 * @param {number} id
 * @returns
 */
export function usePost(id) {
  const url = `/contents/${id}.md`;
  const [, setPost] = useState(0);
  let post = CACHE.get(url);
  if (post === undefined) {
    post = fetchPost(url);
    CACHE.set(url, post);
    post.then(
      (value) => {
        const md = new MarkdownInit(value.mdStr);
        const title = md.getTitle();
        const createdAt = md.getCreatedAt();
        const description = `${title} について書きました。`;
        const content = markdown(md.getContent());
        post.value = { id, title, description, createdAt, content };
        setPost(post);
      },
      (error) => {
        post.error = error;
        setPost(post);
      }
    );
  }

  if (post.value !== undefined) return post.value;
  if (post.error !== undefined) throw new Error(post.error);
  throw post;
}
