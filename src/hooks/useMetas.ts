import { useTitle, useMeta } from "hoofd/preact";

export const useMetas = ({
  title = "",
  description = "",
}: {
  title?: string;
  description?: string;
}) => {
  useTitle(title);
  useMeta({ name: "og:title", content: `takurinton | ${title}` });
  useMeta({ property: "twitter:title", content: `takurinton | ${title}` });
  useMeta({ name: "og:description", content: description });
  useMeta({ property: "twitter:description", content: description });
};
