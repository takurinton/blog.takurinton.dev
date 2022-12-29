import { useRoute } from "preact-iso";
import styles from "./style.module.css";
import { useEffect } from "preact/hooks";
import { usePost } from "src/hooks/usePost";
import { setupHighlightjs } from "src/utils/setupHighlightjs";
import { setupTwitter } from "src/utils/setupTwitter";
import { useMetas } from "src/hooks/useMetas";

export default function Post() {
  const { params } = useRoute();
  const { title, description, createdAt, content } = usePost(params.id);
  useMetas({ title, description });

  useEffect(() => {
    if (/<pre><code class=".*">.*/.test(content)) {
      setupHighlightjs();
    }
  }, []);

  useEffect(() => {
    if (/<blockquote class="twitter-tweet" id=".*">/.test(content)) {
      setupTwitter();
      window.twttr.ready(() => {
        window.twttr.widgets.load();
        const twitters = document.querySelectorAll("blockquote.twitter-tweet");
        twitters.forEach((twitter) =>
          window.twttr.widgets.createTweet(twitter.id, twitter)
        );
      });
    }
  }, []);

  useEffect(() => {
    if (/<div class="og" /.test(content)) {
      if (!window.getElementById("og-style")) {
        const style = document.createElement("style");
        Object.assign(style, {
          id: "og-style",
          innerHTML: `
          .og > a {
            border: 1px gray solid;
            border-radius: 5px;
            width: 80%;
            padding: 10px;
            display: flex;
            text-decoration: none;
            color: #222222;
          }
          .left {
              height: 100px;
              width: 100px;
              text-align: center;
              padding-right: 40px;
          }
          .left > img {
              height: 100px;
              width: 100px;
          }
          .right {
              display: block;
              overflow: hidden;
          }
          .right > h1,
          .right > p,
          .right > a {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              text-overflow: ellipsis;
          }
          .right > h1 {
              height: 50px;
              margin: 0;
          }
          .right > p {
              margin: 0;
          }
          .link { 
              color: gray;
          }
          `,
        });

        document.head.appendChild(style);
      }
    }
  }, []);

  return (
    <div class={styles.content}>
      <h1 class={styles.title}>{title}</h1>
      <p class={styles.date}>{createdAt}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
