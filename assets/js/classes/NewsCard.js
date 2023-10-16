export default class NewsCard {
  constructor(keyWord, container, apiKey, numberOfRequests) {
    this.keyWord = keyWord;
    this.container = container;
    this.apiKey = apiKey;
    this.numberOfRequests = numberOfRequests;
  }

  async #requestNews() {
    const url =
      "https://newsapi.org/v2/everything?" +
      `q=${this.keyWord}&` +
      "sortBy=popularity&" +
      `pageSize=${this.numberOfRequests}&` +
      `apiKey=${this.apiKey}`;
    const request = new Request(url);

    const response = await fetch(request)
      .then((response) => response.json())
      .then(({ articles }) => articles);

    return response;
  }

  async showCard() {
    const articles = await this.#requestNews();
    articles.forEach((newContent) => {
      const card = document.createElement("a");
      let contentTitle = String(newContent.title).slice(0, 60);
      const contentDescription = String(newContent.description).slice(0, 60);
      let content = `
              <article class="c-card u-border-radius u-tertiary-bg-color">
                <aside class="c-card__aside">
                    <img
                    class="c-card__img"
                    src="${newContent.urlToImage}"
                    width="150px"
                    height="100%"
                    alt="${contentDescription.concat("...")}"
                    title"${contentDescription.concat("...")}"
                    />
                </aside>
                <div class="u-column-container u-space-between u-text-center u-padding">
                    <p class="c-card__title">
                    ${contentTitle.concat("...")}
                    </p>
                    <h3>Font: ${newContent.source.name}</h3>
                </div>
              </article>
            `;
      card.setAttribute("href", newContent.url);
      card.setAttribute("target", "_blank");
      card.innerHTML = content;
      this.container.appendChild(card);
    });
  }
}
