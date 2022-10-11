import { getHtml } from "./getHtml";

export const plugin = {
  extensions: [
    {
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
    },
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
