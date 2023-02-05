import { writeFileSync, readFileSync, readdirSync } from "fs";

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
    const c = md[2]
      .replace(/\n/g, "")
      .replace(/```[\s\S]*?```/g, "")
      .slice(0, 300);

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
