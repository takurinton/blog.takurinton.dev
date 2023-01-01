export const plugin = {
  extensions: [
    {
      name: "twitter",
      level: "block",
      start(src) {
        return src.match(/^@twitter\[.*\]$/)?.index;
      },
      tokenizer(src, _) {
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
      tokenizer(src, _) {
        const rule = /^@og\[(.*)\]/;
        const match = rule.exec(src);
        const id = Math.random().toString(36).slice(-8);
        if (match !== null) {
          const token = {
            id,
            type: "og",
            raw: match[0],
            url: match[1].trim(),
            html: `<div class="og" id=${id}>
            <div data-url="${match[1].trim()}"></div>
            <div class="a">
              <div class="left">
                  <img />
              </div>
              <div class="right">
                <h1>loading...</h1>
              </div>
              </div>
            </div>
            `,
            tokens: [],
          };
          this.lexer.inline(token.url, token.tokens);
          return token;
        }
      },
      renderer(token) {
        return token.html;
      },
    },
  ],
};
