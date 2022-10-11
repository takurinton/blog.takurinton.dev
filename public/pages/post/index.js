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

  return (
    <div class={styles.content}>
      <h1 class={styles.title}>{title}</h1>
      <p class={styles.date}>{createdAt}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
