import { useRoute } from "preact-iso";
import styles from "./style.module.css";
import { useMeta, useTitle } from "hoofd/preact";
import { MarkdownInit, markdown } from "../../../src/md";
import { usePost } from "../../../src/hooks/usePost";

export default function Post() {
  const { params } = useRoute();
  const { mdStr } = usePost(params.id);
  const md = new MarkdownInit(mdStr);

  const title = md.getTitle();
  const content = markdown(md.getContent());
  const createdAt = md.getCreatedAt();
  const description = `${title} について書きました。`;
  useTitle(title);
  useMeta({ property: "og:title", content: `takurinton | ${title}` });
  useMeta({ property: "twitter:title", content: `takurinton | ${title}` });
  useMeta({ property: "og:description", content: description });
  useMeta({ property: "twitter:description", content: description });

  return (
    <div style={{ padding: "10%" }}>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <p style={{ textAlign: "right" }}>{createdAt}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
