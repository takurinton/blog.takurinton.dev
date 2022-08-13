import { useMeta, useTitle } from "hoofd/preact";
import styles from "./style.module.css";
import posts from "../../contents/posts.json";

const sortPosts = (posts) => {
  return posts
    .sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    })
    .map((post) => post);
};

export default function Home() {
  const title = "takurinton | Home";
  const description = `takurinton のブログです`;
  useTitle(title);
  useMeta({ property: "og:title", content: title });
  useMeta({ property: "twitter:title", content: title });
  useMeta({ property: "og:description", content: description });
  useMeta({ property: "twitter:description", content: description });

  return (
    <>
      <section class={styles.home}>
        記事一覧
        {sortPosts(posts).map((post) => (
          <div>
            <a href={`/post/${post.id}`}>{post.title}</a>({post.created_at})
          </div>
        ))}
      </section>
    </>
  );
}
