import { marked } from "marked";
import { renderer } from "./renderer";
import { plugin } from "./plugin";

export async function markdown(md: string) {
  marked.use({ renderer, ...plugin });
  return await marked.parse(md);
}
