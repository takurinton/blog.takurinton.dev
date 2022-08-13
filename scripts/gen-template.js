import { writeFileSync, readFileSync } from "fs";
import { createInterface } from "readline";

(() => {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question("title: ", (title) => {
    const posts = JSON.parse(
      readFileSync(`${process.cwd()}/public/contents/posts.json`, "utf8")
    );
    const ids = posts.map((post) => post.id);
    const newId = Math.max(...ids) + 1;

    const date = new Date();
    let newPost = {
      id: newId,
      title,
      description: `${title} について`,
      created_at: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")}`.replace(/\n/g, ""),
    };

    writeFileSync(
      `${process.cwd()}/public/contents/${newId}.md`,
      `---
id: ${newPost.id}
title: ${newPost.title}
description: ${newPost.description}
created_at: ${newPost.created_at}
---
`,
      (err) => {
        if (err) throw err;
        console.log(`${newId} created.`);
      }
    );

    const newPosts = [...posts, newPost];
    writeFileSync(
      `${process.cwd()}/public/contents/posts.json`,
      JSON.stringify(newPosts),
      (err) => {
        if (err) throw err;
        console.log(`posts.json updated.`);
      }
    );
    readline.close();
  });
})();
