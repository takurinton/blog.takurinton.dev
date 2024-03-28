/**
 * @param {string} url
 * @returns {Promise<{title: string, description: string, image: string}>}
 */
const getMetaTags = async (url) => {
  if (!url) {
    return {
      title: "",
      description: "",
      image: "",
    };
  }
  const data = await fetch(`https://meta.takur.in/api/?url=${url}`);
  const json = await data.json();
  return json;
};

/**
 * @param {string} url
 * @param {number} id
 * @returns {Promise<string>}
 */
export const getHtml = async (url, id) => {
  const { title, description, image } = await getMetaTags(url);

  return `
  <div class="og" id=${id}>
  <a href="${url}" target="_blank" class="a">
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
