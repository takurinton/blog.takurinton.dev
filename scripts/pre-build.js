import { writeFileSync, readFileSync, readdirSync } from "fs";
import { marked } from "marked";

const markdownToString = (markdown) => {
  const html = marked(markdown);
  const notTag = html.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
  const breakToSpace = notTag.replace(/(\r\n|\n|\r)/gm, " ");
  const removeTwitter = breakToSpace.replace(/@twitter\[.*\]/g, "");
  const removeOg = removeTwitter.replace(/@og\[.*\]/g, "");
  return removeOg;
};

const FRONTMATTER = /---\n([\s\S]*?)\n---\n\n([\s\S]*)/;
const FRONTMATTER_LIST =
  /id:([\s\S]*)\ntitle:([\s\S]*)\ndescription:([\s\S]*)\ncreated_at:([\s\S]*)/;

(() => {
  const files = readdirSync(`${process.cwd()}/public/contents`);
  const posts = files.filter((file) => file.match(/\.md$/));
  const contents = posts.map((post) => {
    const file = readFileSync(
      `${process.cwd()}/public/contents/${post}`,
      "utf8"
    );
    const md = file.match(FRONTMATTER);
    const id = md[1].match(FRONTMATTER_LIST)[1];
    const c = markdownToString(md[2]).slice(0, 200);

    return { id, content: `${c}...` };
  });

  const postList = readFileSync(`${process.cwd()}/public/contents/posts.json`);
  const newPosts = JSON.parse(postList).map((post) => {
    contents.forEach((content) => {
      if (Number(post.id) === Number(content.id)) {
        post = {
          ...post,
          description: content.content,
        };
      }
    });
    return post;
  });

  writeFileSync(
    `${process.cwd()}/public/contents/posts.json`,
    JSON.stringify(newPosts),
    (err) => {
      if (err) throw err;
      console.log(`posts.json updated.`);
    }
  );
})();
