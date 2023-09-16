class NewsCard {
  constructor(keyWord, container) {
    this.keyWord = keyWord;
    this.container = container;
  }

  static async requestNews() {
    const request = new Request(url, options);

    const response = await fetch(request)
      .then((response) => response.json())
      .then(({ articles }) => console.log(articles));

    return response;
  }

  showCard() {
    const articles = this.constructor.requestNews();

    articles.forEach((newContent, index) => {
      const card = document.createElement("a");
      let contentTitle = String(newContent.title).slice(0, 60);
      let content = `
              <article class="c-card u-border-radius u-tertiary-bg-color">
                <aside class="c-card__aside">
                    <img
                    class="c-card__img"
                    src="${newContent.urlToImage}"
                    width="150px"
                    height="100%"
                    alt="${newContent.description}"
                    title"${newContent.description}"
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
