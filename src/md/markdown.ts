import { marked } from "marked";

const twitter = {
  name: "twitter",
  level: "block",
  start(src) {
    return src.match(/^@twitter\[.*\]$/)?.index;
  },
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

// const og = {
//   name: "og",
//   level: "block",
//   start(src) {
//     return src.match(/^@og/)?.index;
//   },
//   tokenizer(src, tokens) {
//     const rule = /^@og\[.*\]/;
//     const match = rule.exec(src);

//     const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(src);
//     // console.log(link);

//     if (match !== null) {
//       const token = {
//         type: "og",
//         raw: match[0],
//         text: match[0].trim(),
//         tokens: [],
//       };
//       this.lexer.inline(token.text, token.tokens);
//       return token;
//     }
//   },
//   renderer(token) {
//     return `hoge`;
//   },
// };

const renderer = {
  twitter(type, raw, text) {
    const tweetId = text.split("/").pop();
    return `
      <blockquote class="twitter-tweet" id="${tweetId}"></blockquote>
    `;
  },
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
    // const isTwitterLink = /^https:\/\/twitter\.com\/\w+\/status\/\d+/.test(
    //   href
    // );

    // if (isTwitterLink) {
    //   const tweetId = href.split("/").pop();
    //   return `
    //         <blockquote class="twitter-tweet" id="${tweetId}"></blockquote>
    //       `;
    // }

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
export const markdown = (md: string): string => {
  marked.use({
    extensions: [
      twitter,
      // og
    ],
  });
  marked.use({ renderer });
  return marked.parse(md);
};
