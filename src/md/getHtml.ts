const getMetaTags = (html, link) => {
  const description = html.getElementsByName("description")[0];

  const ogImage = html.querySelector('meta[property="og:image"]');

  const domain = link.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1];
  let image;
  if (ogImage === undefined) {
    image = "";
  } else if (ogImage.content.slice(0, 5) === "https") {
    const file = ogImage.content;
    const fileLink = file.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/);

    if (fileLink === null) image = `https://${domain}${file.slice(7)}`;
    else if (fileLink[1] !== domain) {
      const filePathSplit = file.split("/")[3];
      image = `https://${fileLink[1]}/${filePathSplit}`;
    }
  } else {
    const file = ogImage.content;
    const fileLink = file.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/);
    if (fileLink === null) image = `https://${domain}${file.slice(7)}`;
    else {
      const filePathSplit = file.split("/").slice(3).join("/");
      image = `https://${domain}/${filePathSplit}`;
    }
  }

  return {
    title: html.title,
    description: description === undefined ? "" : description.content,
    image: image ?? "",
  };
};

const fetchExternalHtml = async (url) => {
  const res = await fetch(url);
  const html = await res.text();
  return html;
};

export const getHtml = async (url) => {
  let html;
  const htmlString = await fetchExternalHtml(url);

  html = new DOMParser().parseFromString(htmlString, "text/html");
  //   if (typeof window === "undefined") {
  //     const { JSDOM } = await import("jsdom");
  //     const { document } = JSDOM(htmlString).window;
  //     html = document;
  //   } else {
  //     html = new DOMParser().parseFromString(htmlString, "text/html");
  //   }

  const { title, description, image } = getMetaTags(html, url);

  // TODO: 毎回スタイルがレンダリングされるのは無駄なので解消する
  return `<style>
  .og > a {
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
  </style>
  <div class="og">
  <a href="${url}" target="_blank" >
  <div class="left">
      <img src="${image}" alt="${title}" />
  </div>
  <div class="right">
      <h1>${title}</h1>
      <p class="description">${description}</p>
      <p class="link">${url}</p>
  </div>
  </a>
  </div>`;
};
