import feedPlugin from "./plugins/feed/index.js";
import sentensePlugin from "./plugins/sentence/index.js";

export default function (config) {
  sentensePlugin(config);
  feedPlugin(config);

  return {
    alias: {
      "src/*": "src",
    },
  };
}
