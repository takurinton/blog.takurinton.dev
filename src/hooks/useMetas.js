import { useTitle, useMeta } from "hoofd/preact";

/**
 * set meta tags when server rendering and client rendering
 *
 * @param {{title: string, description: string}} param
 */
export const useMetas = ({ title = "", description = "" }) => {
  useTitle(title);
  useMeta({ name: "og:title", content: `takurinton | ${title}` });
  useMeta({ property: "twitter:title", content: `takurinton | ${title}` });
  useMeta({ name: "og:description", content: description });
  useMeta({ property: "twitter:description", content: description });
};
