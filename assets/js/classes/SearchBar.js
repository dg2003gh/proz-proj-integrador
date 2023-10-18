export class SearchBar {
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
    this.regExp = /#[a-z A-Z 0-9]+/g;
    this.#activeTag();
  }

  #renderTags(tagList) {
    const renderedTagsContainer = document.getElementById(
      "rendered-tags-container"
    );

    for (let tag in tagList) {
      let newTag = document.createElement("span");
      newTag.innerText = tagList[tag];
      newTag.setAttribute(
        "class",
        "js-tag-card u-primary-bg-color u-border-radius u-padding"
      );
      renderedTagsContainer.appendChild(newTag);
    }
  }

  #activeTag() {
    const tags = this.tagsList;
    tags.forEach((element) => {
      element.onclick = () => {
        element.classList.toggle("u-accept-color");
      };
    });
  }

  searchReturn() {
    let searchText = this.searchBar.value;
    let arrayTagSearch = searchText.match(this.regExp);
    const dataBase = this.dataBase;
    let tagsList = Array.from(this.tagsList);
    let tagsActiveList = [];
    let cardsFiltered = [];
    let cardsFoundForTitle = [];
    let cardsFoundForDescription = [];
    let cardsFoundForTags = [];
    let cardsFound = [];
    let tagsFilter = [];

    this.#activeTag();

    if (!window.location.href.endsWith("searchPage.html")) {
      return false;
    }

    this.searchResultContainer.innerHTML = "";
    tagsActiveList = tagsList.filter((tag) => {
      return tag.classList.contains("u-tag-active");
    });

    if (tagsActiveList.length > 0) {
      cardsFiltered = dataBase.filter((card) => {
        let namesTagsActive = tagsActiveList.map((tag) =>
          tag.getAttribute("name")
        );
        tagsFilter = card.tags.filter((tag) => {
          return namesTagsActive.includes(tag);
        });

        let tagsFound = tagsFilter.length;

        card.tagsOccurrence += tagsFilter.length;

        return tagsFound > 0;
      });
    } else {
      cardsFiltered = dataBase;
    }

    cardsFoundForTitle = cardsFiltered.filter((card) => {
      const regExp = new RegExp(searchText.toLowerCase());
      return regExp.test(card.title.toLowerCase());
    });

    cardsFoundForDescription = cardsFiltered.filter((card) => {
      const regExp = new RegExp(searchText.toLowerCase());
      return (
        regExp.test(card.description.toLowerCase()) &&
        !cardsFoundForTitle.includes(card)
      );
    });

    cardsFoundForTags = cardsFiltered.filter((card) => {
      if (arrayTagSearch != null) {
        arrayTagSearch = arrayTagSearch.map((tag) => tag.trim());

        tagsFilter = card.tags.filter((tag) => {
          return arrayTagSearch.includes(tag);
        });

        let tagsFound = tagsFilter.length;
        card.tagsOccurrence += tagsFound;

        return card.tagsOccurrence > 0;
      } else {
        return 0;
      }
    });
    cardsFound = cardsFoundForTitle.concat(cardsFoundForDescription);
    cardsFound = cardsFound.concat(cardsFoundForTags);
    cardsFound.sort((a, b) => b.tagsOccurrence - a.tagsOccurrence);

    if (cardsFound.length == 0) {
      this.#resetSearchResult(this.searchResultContainer);
    } else {
      cardsFound.forEach((cardFound, cardIndex) => {
        this.#addCard(cardFound, cardIndex);
      });
    }
    return true;
  }

  #addCard(cardInfo, cardIndex) {
    const card = document.createElement("article");
    card.setAttribute(
      "class",
      "c-card u-border-radius u-tertiary-bg-color u-mouse-over"
    );

    card.innerHTML = `
      <aside class="c-card__aside">
        <img class="c-card__img" src="${
          cardInfo.image
        }" width="200px" height="100%" alt="Establishment image">
      </aside>
      <div class="u-column-container u-space-between u-text-center u-padding">
        <header>
          <p c-card__title>${cardInfo.title}</p>
        </header>
        <div>
          <p>${cardInfo.description}</p>
        </div>
        <footer class="u-column-container">
          <span  class="u-row-container u-space-around u-mobile__container">
            <div id="c-rate-container${cardIndex}" class="u-gap u-center u-margin">
                <span>Rank: </span>
            </div>
            <div class="support u-center">
              <span>Support</span>
              <img
                class="c-card__icons"
                src="/assets/imgs/accessibility_icons/Braile.svg"
                alt="Braille icon"
              />
              <img
                class="c-card__icons"
                src="/assets/imgs/accessibility_icons/cão guia.svg"
                alt="Guide dog icon"
              />
              <img
                class="c-card__icons"
                src="/assets/imgs/accessibility_icons/baixa visão.svg"
                alt="Low vision icon"
              />
              <img
                class="c-card__icons"
                src="/assets/imgs/accessibility_icons/interprete libras.svg"
                alt="Pound interpreter icon"
              />
            </div>
            <div class="locality u-center">
              <span>Locality: ${cardInfo.address
                .slice(0, 60)
                .concat("...")}</span>
            </div>
          </span>
          <div id="rendered-tags-container" class="u-row-container u-center u-margin u-gap u-mobile__none">
          </div>
        </footer>
      </div>
    `;

    card.onclick = () => {
      if (!window.location.href.endsWith("establishmentPage")) {
        window.location.href = "../html/establishmentPage.html";
        localStorage.setItem("establishmentIndex", cardInfo.id);
      }
    };

    this.searchResultContainer.appendChild(card);
    this.#renderTags(cardInfo.tags);
    this.#setRate(cardIndex);
  }

  #resetSearchResult(container) {
    container.innerHTML = `
      <div class="u-padding">
              <h1>No establishments found</h1>
      </div>
    `;
  }

  #setRate(cardIndex) {
    const rateContainer = document.getElementById(
      "c-rate-container" + cardIndex
    );
    for (let index = 0; index < 5; ++index) {
      let star = '<i class="ri-star-fill"></i>';
      if (index < this.dataBase[cardIndex].rate) {
        star = '<i class="ri-star-fill u-highlight-color"></i>';
      }
      rateContainer.innerHTML += star;
    }
  }
}
