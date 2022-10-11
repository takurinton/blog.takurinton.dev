import { marked } from "marked";
import { plugin } from "./plugin";

const renderer = {
  heading(text, level) {
    if (level === 1) {
      return `<h${level} class="h${level}" style="border-bottom: 2px solid #ff69b4; padding-bottom: 5px">${text}</h${level}>`;
    }
    return `<h${level} class="h${level}">${text}</h${level}>`;
  },
  table(header, body) {
    return `
      <table class="table" border="1" width="100%">
        ${header}
        ${body}
      </table>
    `;
  },
  list(body: string, ordered: boolean, start: number) {
    if (ordered) {
      return `
        <ul style='padding-left: ${start}'>
            ${body}
        </ul>
      `;
    }
    return `
      <ul>
          ${body}
      </ul>
    `;
  },
  image(href, title, text) {
    return `
      <img src=${href} alt=${text} class="content-img ${title ?? ""}" />
    `;
  },
  paragraph(text) {
    return `
      <p class="p">${text}</p>
    `;
  },
  link(href, title, text) {
    return `
      <a href="${href}" target="_blank" class=${title}>${text}</a>
    `;
  },
  blockquote(quote) {
    return `<blockquote style="border-left:3px solid gray;margin:0 0 0 10px;padding-left:20px;color:gray;">${quote}</blockquote>`;
  },
};

export async function markdown(md: string) {
  marked.use({ renderer });
  marked.use(plugin);
  const html = await marked.parse(md);
  return html;
}
