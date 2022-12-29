import { useEffect } from "preact/hooks";
import { getHtml } from "src/md/getHtml";
import { setupHighlightjs } from "src/utils/setupHighlightjs";
import { setupTwitter } from "src/utils/setupTwitter";

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    twttr: any;
  }
}

export const useClientAssets = (content) => {
  useEffect(() => {
    if (/<pre><code class=".*">.*/.test(content)) {
      setupHighlightjs();
    }
  }, []);

  useEffect(() => {
    if (/<blockquote class="twitter-tweet" id=".*">/.test(content)) {
      setupTwitter();
      window.twttr.ready(() => {
        window.twttr.widgets.load();
        const twitters = document.querySelectorAll("blockquote.twitter-tweet");
        twitters.forEach((twitter) =>
          window.twttr.widgets.createTweet(twitter.id, twitter)
        );
      });
    }
  }, []);

  useEffect(() => {
    if (/<div class="og"/.test(content)) {
      (async () => {
        const og = document.getElementsByClassName("og");
        Array.from(og).forEach((element) => {
          const url = element
            .querySelector("div[data-url]")
            .getAttribute("data-url");
          const id = element.id;
          getHtml(url, id).then((html) => {
            element.innerHTML = html;
          });
        });
      })();

      if (!document.getElementById("og-style")) {
        const style = document.createElement("style");
        Object.assign(style, {
          id: "og-style",
          innerHTML: `
            .og > .a {
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
            `,
        });
        document.head.appendChild(style);
      }
    }
  }, []);
};
