import { useRoute } from "preact-iso";
import styles from "./style.module.css";
import { useEffect } from "preact/hooks";
import { usePost } from "src/hooks/usePost";
import { setupHighlightjs } from "src/utils/setupHighlightjs";
import { useMetas } from "src/hooks/useMetas";

export default function Post() {
  const { params } = useRoute();
  const { title, description, createdAt, content } = usePost(params.id);
  useMetas({ title, description });

  useEffect(() => {
    setupHighlightjs();
  }, []);

  return (
    <div class={styles.content}>
      <h1 class={styles.title}>{title}</h1>
      <p class={styles.date}>{createdAt}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
