import { useState } from "preact/hooks";
import { markdown, MarkdownInit } from "src/md";

type FetchPost = {
  mdStr: string;
  meta: {};
};

type Post = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  content: string;
};

type Response = Post | Error;

const CACHE = new Map();

async function fetchPost(url?: string): Promise<FetchPost> {
  const mdStr = await fetch(url).then((res) => res.text());
  const meta = {};
  return { mdStr, meta };
}

export function usePost(id: string): Response {
  const url = `/contents/${id}.md`;
  const [, setPost] = useState(0);
  const [, setContent] = useState("");
  let post = CACHE.get(url);
  if (post === undefined) {
    post = fetchPost(url);
    CACHE.set(url, post);
    post.then(
      (value: FetchPost) => {
        post.value = value;
        setPost(post);
      },
      (error: any) => {
        post.error = error;
        setPost(post);
      }
    );
  }

  if (post.value !== undefined) {
    const md = new MarkdownInit(post.value.mdStr);
    const title = md.getTitle();
    // const content = markdown(md.getContent());
    const createdAt = md.getCreatedAt();
    const description = `${title} について書きました。`;

    markdown(md.getContent()).then((value) => {
      post.c = value;
      setContent(value);
    });

    return {
      id,
      title,
      description,
      createdAt,
      content: post.c ?? "",
    };
  }
  if (post.error !== undefined) throw new Error(post.error);
  throw post;
}
