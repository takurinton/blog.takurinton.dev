import { writeFileSync, readFileSync, readdirSync } from "fs";

(() => {
  const files = readdirSync(`${process.cwd()}/public/contents`);
  const posts = files.filter((file) => file.match(/\.md$/));

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
  <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
  <atom:link href="https://blog.takurinton.dev/rss.xml" rel="self" type="application/rss+xml" />
  <title>たくりんとん</title>
  <link>https://blog.takurinton.dev</link>
  <description>たくりんとんのブログです</description>
  <language>en</language>
  <managingEditor>takurinton@takurinton.com (takurinton)</managingEditor>
  <webMaster>takurinton@takurinton.com (takurinton)</webMaster>
  <image>
      <url>https://takurinton.dev/me.jpeg</url>
      <title>たくりんとん</title>
      <link>https://blog.takurinton.dev</link>
      <width>32</width>
      <height>32</height>
  </image>
  ${posts
    .map(
      (content) => `
      <item>
      <title>${content.title} | たくりんとんのブログ</title>
      <link>https://blog.takurinton.dev/post/${content.id}</link>
      <pubDate>${new Date(content.created_at).toUTCString()}</pubDate>
      <description>${content.content}</description>
      <guid>https://blog.takurinton.dev/post/${content.id}</guid>
      </item>`
    )
    .join("")}
  </channel>
  </rss>`;

  writeFileSync(`${process.cwd()}/dist/rss.xml`, feed, (err) => {
    if (err) throw err;
    console.log(`posts.json updated.`);
  });
})();
