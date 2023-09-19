class SearchBar {
  constructor(
    searchBar,
    searchButton,
    searchResultContainer,
    tagsList,
    dataBase
  ) {
    this.searchBar = searchBar;
    this.searchButton = searchButton;
    this.searchResultContainer = searchResultContainer;
    this.tagsList = tagsList;
    this.dataBase = dataBase;
  }

  #activeTag() {
    const tags = this.tagsList;

    tags.forEach((element) => {
      element.addEventListener("click", () => {
        if (element.getAttribute("selected") == "false") {
          element.style.backgroundColor = "green";
          element.setAttribute("selected", "true");
        } else {
          element.style.backgroundColor = "";
          element.setAttribute("selected", "false");
        }
      });
    });
  }

  searchReturn() {
    let searchText = this.searchBar.value;
    const dataBase = this.dataBase;
    let cardsFound = [];

    this.#activeTag();

    if (!searchText) return;

    searchButton.onclick = () => {
      this.searchResultContainer.innerHTML = "";

      cardsFound = dataBase.filter((card) => {
        const regExp = new RegExp(searchText.toLowerCase());
        //regExp.test(card.tags.toLowerCase());card.description.toLowerCase()

        return regExp.test(card.title.toLowerCase());
      });

      cardsFound.forEach((cardFound) => {
        this.#addCard(cardFound);
      });
    };
  }

  #addCard(cardInfo) {
    const card = document.createElement("article");
    card.setAttribute("class", "c-searching__card");
    card.innerHTML = `
      <aside>
        <img class="c-searching-container__image" src="${cardInfo.image}" alt="Establishment image">
      </aside>
      <div class="c-searching-container__card-information u-column-container u-space-between">
        <header>
          <h2>${cardInfo.title}</h2>
        </header>
        <div>
          <p>${cardInfo.description}</p>
        </div>
        <footer class="c-searching-container__footer u-space-around">
          <div class="rank">
              <span>Rank: </span>
              <i class="ri-star-line"></i>
              <i class="ri-star-line"></i>
              <i class="ri-star-line"></i>
              <i class="ri-star-line"></i>
              <i class="ri-star-line"></i>
          </div>
          <div class="support">
            <span>Support</span>
            <img
              class="c-searching-container__icon"
              src="/assets/imgs/accessibility_icons/Braile.svg"
              alt="Braille icon"
            />
            <img
              class="c-searching-container__icon"
              src="/assets/imgs/accessibility_icons/cão guia.svg"
              alt="Guide dog icon"
            />
            <img
              class="c-searching-container__icon"
              src="/assets/imgs/accessibility_icons/baixa visão.svg"
              alt="Low vision icon"
            />
            <img
              class="c-searching-container__icon"
              src="/assets/imgs/accessibility_icons/interprete libras.svg"
              alt="Pound interpreter icon"
            />
          </div>
          <div class="locality">
            <span>Locality: </span><span>...</span>
          </div>
        </footer>
      </div>
    `;
    this.searchResultContainer.appendChild(card);
  }
}
