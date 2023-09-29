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
    this.regExp = /#[a-z A-Z]+/g;
    this.#activeTag()
  }

  #renderTags(tagList, container){
    for (let tag in tagList){
      let newTag = document.createElement("span");
      newTag.innerText = tagList[tag]
      newTag.setAttribute("class", "tag-card");
      container.appendChild(newTag);
    }
  }

  #activeTag() {
    const tags = this.tagsList;
    tags.forEach((element) => {
      element.onclick = ()=>{
        element.classList.toggle("u-tag-active")
      }
    });
  }

  searchReturn() {
    let searchText = this.searchBar.value;
    let arrayTagSearch = searchText.match(this.regExp)
    const dataBase = this.dataBase;
    let cardsFoundForTitle = [];
    let cardsFoundForDescription = [];
    let cardsFoundForTags = [];
    let cardsFound = [];

    this.#activeTag();

    if (!searchText) return;

    this.searchButton.onclick = () => {
      this.searchResultContainer.innerHTML = "";

      // cardsFoundForTitle = dataBase.filter((card) => {
      //   const regExp = new RegExp(searchText.toLowerCase());
      //   return regExp.test(card.title.toLowerCase());
      // });

      // cardsFoundForDescription = dataBase.filter((card) => {
      //   const regExp = new RegExp(searchText.toLowerCase());
      //   return regExp.test(card.description.toLowerCase());
      // });

      console.log('# encontradas:')
      console.log(arrayTagSearch)

      let tagsFilter = []
      cardsFoundForTags = dataBase.filter((card) => {   
        // Titulo do card   
        console.log(card.title)

        if (arrayTagSearch != null){
          console.log("TEM #")

          tagsFilter = card.tags.filter((tag)=>{
            console.log(tag)
            return arrayTagSearch.includes(tag)
          });
          console.log('# Filtradas:')
          console.log(tagsFilter)

          card.tags_occurrence = tagsFilter.length;
          console.log('# Ocorrencias:')
          console.log(card.tags_occurrence)

          return (card.tags_occurrence > 0)
        }
        else{
          console.log("NÃO TEM #")
          return 0;
        }
    });

      console.log('++')
      console.log(cardsFoundForTags)
      
      cardsFound = cardsFoundForTitle.concat(cardsFoundForDescription)
      cardsFound = cardsFound.concat(cardsFoundForTags)
      console.log("00")
      console.log(cardsFound)

      if (cardsFound.length == 0){
        this.#resetSearchResult(this.searchResultContainer);
      }
      else{
        cardsFound.forEach((cardFound) => {
          this.#addCard(cardFound);
        });
      }
    };
  }

  #addCard(cardInfo) {
    const card = document.createElement("article");
    card.setAttribute("class", "c-searching__card");

    const renderedTags = document.createElement("div");
    renderedTags.setAttribute("class", "u-row-container");
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
    this.#renderTags(cardInfo.tags, renderedTags)
    card.childNodes[3].appendChild(renderedTags)
    this.searchResultContainer.appendChild(card);
  }

  #resetSearchResult(container){
    container.innerHTML = `
      <div class="u-padding">
              <h1>No stablishments found</h1>
      </div>
    `
  };
}
