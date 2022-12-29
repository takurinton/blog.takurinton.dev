const getMetaTags = async (url) => {
  if (!url) {
    return {
      title: "",
      description: "",
      image: "",
    };
  }
  const data = await fetch(
    `https://meta-tags-takurinton.vercel.app/api/?url=${url}`
  );
  const json = await data.json();
  return json;
};

export const getHtml = async (url) => {
  const { title, description, image } = await getMetaTags(url);

  return `
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
  </div>
  `;
};
