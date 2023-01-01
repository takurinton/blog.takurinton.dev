import { marked } from "marked";
import { renderer } from "./renderer";
import { plugin } from "./plugin";

export function markdown(md: string) {
  marked.use({ renderer, ...plugin });
  return marked.parse(md);
}
