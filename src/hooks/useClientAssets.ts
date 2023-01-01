import { useEffect } from "preact/hooks";
import { setupClientAssets } from "src/utils/setupClientAssets";
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
      setupClientAssets();
    }
  }, []);
};
