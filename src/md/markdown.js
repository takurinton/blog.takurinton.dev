import { marked } from "marked";
import { renderer } from "./renderer";
import { plugin } from "./plugin";

/**
 * parse markdown string to html string using marked
 *
 * @param {string} md - markdown string
 * @returns markdown string
 */
export function markdown(md) {
  marked.use({ renderer, ...plugin });
  return marked.parse(md);
}
