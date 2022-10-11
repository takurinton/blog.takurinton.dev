import { marked } from "marked";
import { JSDOM } from "jsdom";

export const getMetaTags = (html, link) => {
  const description = html.getElementsByName("description")[0];
  const favicon =
    html.querySelector('link[rel="icon"]') ??
    html.querySelector('link[rel="shortcut icon"]');

  const domain = link.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1];
  let image;
  if (favicon === undefined) {
    image = "";
  } else if (favicon.href.slice(0, 5) === "https") {
    const file = favicon.href;
    const fileLink = file.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/);

    if (fileLink === null) image = `https://${domain}${file.slice(7)}`;
    else if (fileLink[1] !== domain) {
      const filePathSplit = file.split("/")[3];
      image = `https://${fileLink[1]}/${filePathSplit}`;
    }
  } else {
    const file = favicon.href;
    const fileLink = file.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/);
    if (fileLink === null) image = `https://${domain}${file.slice(7)}`;
    else {
      const filePathSplit = file.split("/").slice(3).join("/");
      image = `https://${domain}/${filePathSplit}`;
    }
  }

  return {
    title: html.title,
    description: description === undefined ? "" : description.content,
    image: image ?? "",
  };
};

const twitter = {
  name: "twitter",
  level: "block",
  start(src) {
    return src.match(/^@twitter\[.*\]$/)?.index;
  },
  // eslint-disable-next-line no-unused-vars
  tokenizer(src, tokens) {
    const rule = /^@twitter\[(.*)\]/;
    const match = rule.exec(src);
    if (match !== null) {
      const token = {
        type: "twitter",
        raw: match[0],
        text: match[1],
        id: match[1].split("/").pop(),
        tokens: [],
      };
      // @ts-ignore
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  },
  renderer(token) {
    return `<blockquote class="twitter-tweet" id="${token.id}"></blockquote>`;
  },
};

const fetchExternalHtml = async (url) => {
  const res = await fetch(url);
  const html = await res.text();
  return html;
};

const getHtml = async (url) => {
  const htmlString = await fetchExternalHtml(url);
  const html = new DOMParser().parseFromString(htmlString, "text/html");
  const { title, description, image } = getMetaTags(html, url);

  return `<style>
.og > a {
    border: 1px gray solid;
    border-radius: 5px;
    width: 80%;
    padding: 10px;
    display: flex;
    text-decoration: none;
    color: #222222;
}
.left {
    height: 100px;
    width: 100px;
    text-align: center;
    padding-right: 40px;
}
.left > img {
    height: 100px;
    width: 100px;
}
.right {
    display: block;
    overflow: hidden;
}
.right > h1,
.right > p,
.right > a {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.right > h1 {
    height: 50px;
    margin: 0;
}
.right > p {
    margin: 0;
}
.link { 
    color: gray;
}
</style>
<div class="og">
<a href="${url}" target="_blank" >
<div class="left">
    <img src="${image}" alt="${title}" />
</div>
<div class="right">
    <h1>${title}</h1>
    <p class="description">${description}</p>
    <p class="link">${url}</p>
</div>
</a>
</div>`;
};

const og = {
  extensions: [
    {
      name: "og",
      level: "block",
      start(src) {
        return src.match(/^@og\[(.*)\]/)?.index;
      },
      // eslint-disable-next-line no-unused-vars
      tokenizer(src, tokens) {
        const rule = /^@og\[(.*)\]/;
        const match = rule.exec(src);
        if (match !== null) {
          const token = {
            type: "og",
            raw: match[0],
            url: match[1].trim(),
            html: "",
            tokens: [],
          };
          // @ts-ignore
          this.lexer.inline(token.text, token.tokens);
          return token;
        }
      },
      renderer(token) {
        return token.html;
      },
    },
  ],
  async: true,
  async walkTokens(token) {
    if (token.type === "og") {
      const html = await getHtml(token.url);
      token.html = html;
    }
  },
};

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

// TODO: rintonmd
// https://github.com/takurinton/rintonmd
export const markdown = async (md: string) => {
  marked.use({
    extensions: [twitter],
  });
  marked.use(og);
  marked.use({ renderer });
  const html = await marked.parse(md);
  return html;
};
