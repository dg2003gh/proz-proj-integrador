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
    window.addEventListener("keydown", (event) => {
      if (event.code == "Enter") {
        console.log("Enter Pressionada");
      }
    });
  }

  #renderTags(tagList) {
    const renderedTagsContainer = document.getElementById("rendered-tags-container");
    console.log("renderTags" + renderedTagsContainer)
    for (let tag in tagList) {
      let newTag = document.createElement("span");
      newTag.innerText = tagList[tag];
      newTag.setAttribute("class", "js-tag-card u-primary-bg-color u-border-radius u-padding");
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

    // if (!searchText) return;

    if (!window.location.href.endsWith("searchPage.html")) {
      return false;
    }

    this.searchResultContainer.innerHTML = "";
    tagsActiveList = tagsList.filter((tag)=>{
      return tag.classList.contains("u-tag-active")
    })

    if (tagsActiveList.length > 0){
        cardsFiltered = dataBase.filter((card) =>{
        let namesTagsActive = tagsActiveList.map((tag)=>tag.getAttribute('name'))
        tagsFilter = card.tags.filter((tag) =>{
          return namesTagsActive.includes(tag)
        });
    
        let tagsFound = tagsFilter.length

        card.tagsOcurrence += tagsFilter.length;

        return tagsFound > 0;
      })
      console.log(cardsFiltered)
    }
    else{
        cardsFiltered = dataBase;
    }

    cardsFoundForTitle = cardsFiltered.filter((card) => {
      const regExp = new RegExp(searchText.toLowerCase());
      return regExp.test(card.title.toLowerCase());
    });

    cardsFoundForDescription = cardsFiltered.filter((card) => {
      const regExp = new RegExp(searchText.toLowerCase());
      return regExp.test(card.description.toLowerCase()) && !cardsFoundForTitle.includes(card);
    });

    cardsFoundForTags = cardsFiltered.filter((card) => {   
      if (arrayTagSearch != null){
        arrayTagSearch = arrayTagSearch.map((tag)=> tag.trim())

        tagsFilter = card.tags.filter((tag)=>{
          return arrayTagSearch.includes(tag)
        });

        let tagsFound = tagsFilter.length;
        card.tagsOcurrence += tagsFound;

        return (card.tagsOcurrence > 0)
      }
      else{
        return 0;
      }
    });
      cardsFound = cardsFoundForTitle.concat(cardsFoundForDescription)
      cardsFound = cardsFound.concat(cardsFoundForTags)
      console.log(cardsFound[0].cardInfo)
      cardsFound.sort((a, b) => b.tagsOcurrence - a.tagsOcurrence);

      if (cardsFound.length == 0){
        this.#resetSearchResult(this.searchResultContainer);
      }
      else{
        cardsFound.forEach((cardFound) => {
          this.#addCard(cardFound);
        });
      }
    return true;
  }

  #addCard(cardInfo) {
    const card = document.createElement("article");
    card.setAttribute("class", "c-card u-border-radius u-tertiary-bg-color");

    card.innerHTML = `
      <aside class="c-card__aside">
        <img class="c-card__img" src="${cardInfo.image}" width="200px" height="100%" alt="Establishment image">
      </aside>
      <div class="u-column-container u-space-between u-text-center u-padding">
        <header>
          <p c-card__title>${cardInfo.title}</p>
        </header>
        <div>
          <p>${cardInfo.description}</p>
        </div>
        <footer class="u-column-container">
          <span class="u-row-container u-space-around">
            <div class="rank u-center">
                <span>Rank: </span>
                <i class="ri-star-line"></i>
                <i class="ri-star-line"></i>
                <i class="ri-star-line"></i>
                <i class="ri-star-line"></i>
                <i class="ri-star-line"></i>
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
              <span>Locality: </span><span>...</span>
            </div>
          </span>
          <div id="rendered-tags-container" class="u-row-container u-gap">
            
          </div>
        </footer>
      </div>
    `;
    this.searchResultContainer.appendChild(card);
    this.#renderTags(cardInfo.tags)
  }

  #resetSearchResult(container) {
    container.innerHTML = `
      <div class="u-padding">
              <h1>No stablishments found</h1>
      </div>
    `;
  }
}
