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
    this.#activeTag()
    window.addEventListener("keydown", (event)=>{
      if (event.code == "Enter"){
        console.log("Enter Pressionada")
      }
    })
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
    let tagsList = Array.from(this.tagsList)
    let tagsActiveList = [];
    let cardsFiltered = [];
    let cardsFoundForTitle = [];
    let cardsFoundForDescription = [];
    let cardsFoundForTags = [];
    let cardsFound = [];
    let tagsFilter = [];

    this.#activeTag();

    // if (!searchText) return;

    if(!window.location.href.endsWith("searchPage.html")){
      return false
    }

    console.log('oiljfda')
    setTimeout(()=>{this.searchBar.value = "aaa"}, 6000)
    this.searchButton.onclick = () => {
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

          card.tags_ocurrence += tagsFilter.length;

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
          card.tags_ocurrence += tagsFound;

          return (card.tags_ocurrence > 0)
        }
        else{
          return 0;
        }
      });
      
        cardsFound = cardsFoundForTitle.concat(cardsFoundForDescription)
        cardsFound = cardsFound.concat(cardsFoundForTags)
        cardsFound.sort((a, b) => b.tags_ocurrence - a.tags_ocurrence);

        if (cardsFound.length == 0){
          this.#resetSearchResult(this.searchResultContainer);
        }
        else{
          cardsFound.forEach((cardFound) => {
            this.#addCard(cardFound);
          });
        }
    };
    return true;
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
      <div class="c-searching-container__card-information u-column-container u-all-parent">
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
