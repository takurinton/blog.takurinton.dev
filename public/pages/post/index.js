import { useMeta, useTitle } from "hoofd";
import { useRoute } from "preact-iso";
import styles from "./style.module.css";
import { MarkdownInit, markdown } from "src/md";
import { useEffect } from "preact/hooks";
import { usePost } from "src/hooks/usePost";
import { setupHighlightjs } from "src/utils/setupHighlightjs";

export default function Post() {
  const { params } = useRoute();
  const { mdStr } = usePost(params.id);
  const md = new MarkdownInit(mdStr);

  const title = md.getTitle();
  const content = markdown(md.getContent());
  const createdAt = md.getCreatedAt();
  const description = `${title} について書きました。`;
  useTitle(title);
  useMeta({ name: "og:title", content: `takurinton | ${title}` });
  useMeta({ property: "twitter:title", content: `takurinton | ${title}` });
  useMeta({ name: "og:description", content: description });
  useMeta({ property: "twitter:description", content: description });

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
