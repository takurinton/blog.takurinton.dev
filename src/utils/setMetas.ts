import { useMeta, useTitle } from "hoofd";

export const setMetas = ({
  title = "",
  description = "",
}: {
  title?: string;
  description?: string;
}) => {
  useTitle(title);
  useMeta({ property: "og:title", content: `takurinton | ${title}` });
  useMeta({ property: "twitter:title", content: `takurinton | ${title}` });
  useMeta({ property: "og:description", content: description });
  useMeta({ property: "twitter:description", content: description });
};
