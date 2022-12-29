import { useRoute } from "preact-iso";
import styles from "./style.module.css";
import { usePost } from "src/hooks/usePost";
import { useMetas } from "src/hooks/useMetas";
import { useClientAssets } from "src/hooks/useClientAssets";

export default function Post() {
  const { params } = useRoute();
  const { title, description, createdAt, content } = usePost(params.id);
  useMetas({ title, description });
  useClientAssets(content);

  return (
    <div class={styles.content}>
      <h1 class={styles.title}>{title}</h1>
      <p class={styles.date}>{createdAt}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
