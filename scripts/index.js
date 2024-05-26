const CACHE = new Map();

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

/**
 * Set external link card when OG embedding exists
 */
const setupClientAssets = () => {
  (async () => {
    const og = document.getElementsByClassName("og");
    Array.from(og).forEach((element) => {
      const url = element
        .querySelector("div[data-url]")
        .getAttribute("data-url");

      if (CACHE.has(url)) {
        element.innerHTML = CACHE.get(url);
      } else {
        getHtml(url, element.id)
          .then((html) => {
            CACHE.set(url, html);
            element.innerHTML = html;
          })
          .catch((_) => {
            element.innerHTML = `<div class="a">
                <div class="right" style="height:100px">
                    <h1 style="color:red">カードの取得に失敗しました。</h1>
                </div>
            </div>`;
          });
      }
    });
  })();

  if (!document.getElementById("og-style")) {
    const style = document.createElement("style");
    Object.assign(style, {
      id: "og-style",
      innerHTML: `
            .og > .a {
              box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
              border-radius: 5px;
              width: 80%;
              padding: 10px;
              display: flex;
              text-decoration: none;
              color: #222222;
            }
            .left {
                max-width: 100px;
                min-width: 100px;
                height: 100px;
                width: 100px;
                text-align: center;
                padding-right: 30px;
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

            @media screen and (max-width: 768px) {
              .og > .a {
                  height: 70px;
                  width: 90%;
              }
              .left {
                  max-width: 60px;
                  min-width: 60px;
                  max-height: 60px;
                  min-height: 60px;
                  padding-right: 10px;
                  padding-top: 10px;
              }
              .left > img {
                  height: 50px;
                  width: 50px;
              }
              .right {
                  height: 100px;
              }
              .right > h1 {
                  height: 32px;
                  font-size: 1.2rem;
              }
              .right > p {
                  font-size: 0.8rem;
              }
            }
            `,
    });
    document.head.appendChild(style);
  }
};

setupClientAssets();
