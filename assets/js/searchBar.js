// Barra de pesquisa
const searchBar = document.querySelector("input.ri-search-line");
// Botão de pesquisa
const searchButton = document.querySelector("button#header_search_button");

// Container de pesquisa
const searchContainer = document.querySelector("div.c-searching-container");

// Resultado da pesquisa
const searchResult = searchContainer.querySelector("div.c-searching-container__result");

// Body
const body = document.querySelector("body");

// Array de filtro
let filterArray = [];

// Cards fictícios
let arrayCard = [
  {
    "image": "/assets/imgs/stablishments/happiness_coffee_shop.png",
    "title": "Happiness Coffee Shop",
    "description": "A comfortable place for you and your whole family. Our facilities have ramps, a room for guide dogs, menus in Pounds version..."
  },
  {
    "image": "/assets/imgs/stablishments/zursky_tech.png",
    "title": "Zurski Tech",
    "description": "A comfortable place for you and your whole family. Our facilities have ramps, a room for guide dogs, menus in Pounds version..."
  },
  {
    "image": "/assets/imgs/stablishments/green_vegan_restaurant.png",
    "title": "Green Vegan Restaurant",
    "description": "A comfortable place for you and your whole family. Our facilities have ramps, a room for guide dogs, menus in Pounds version..."
  },
  {
    "image": "/assets/imgs/stablishments/gold_hotel.png",
    "title": "Gold Hotel",
    "description": "A comfortable place for you and your whole family. Our facilities have ramps, a room for guide dogs, menus in Pounds version..."
  }
];


searchBar.onkeyup = (e)=>{
  // Texto de pesquisa
  let searchText = e.target.value;
  
  if(searchText){
    searchButton.onclick = ()=>{
      // Verifica se o usuário não está ja página de pesquisa
      if (!(window.location.pathname === "/assets/html/searchPage.html")){
        // Redireciona para página de pesquisa
        window.location.href = "./searchPage.html";
      }

      clearSearchResult();

      // Filtrando cards
      filterArray = arrayCard.filter((card)=>{
        return card.title.toLowerCase().startsWith(searchText.toLowerCase());
      })
      console.log(filterArray)
      for (i in filterArray){
        addCard(i);
      }
    }
  }
};

// Adiciona o evento clearCards em todas as tags de pesquisa
// Na lista há uma função entries() que não sei o que é...
tags = document.querySelectorAll("span.tag")
for (let pos=0; pos < tags.length; pos++){
  tags[pos].addEventListener("click", clearCards)
}

function addCard(index){
    // Get search container result
    card = document.createElement("article")
    card.setAttribute("class", "c-searching__card")
    card.innerHTML += `
      <aside>
        <img class="c-searching-container__image" src="${filterArray[index].image}" alt="Establishment image">
      </aside>
      <div class="c-searching-container__card-information u-column-container u-space-between">
        <header>
          <h2>${filterArray[index].title}</h2>
        </header>
        <div>
          <p>${filterArray[index].description}</p>
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
              class="acessIcon c-searching-container__icon"
              src="/assets/imgs/accessibility_icons/Braile.svg"
              alt="Braille icon"
            />
            <img
              class="acessIcon c-searching-container__icon"
              src="/assets/imgs/accessibility_icons/cão guia.svg"
              alt="Guide dog icon"
            />
            <img
              class="acessIcon c-searching-container__icon"
              src="/assets/imgs/accessibility_icons/baixa visão.svg"
              alt="Low vision icon"
            />
            <img
              class="acessIcon c-searching-container__icon"
              src="/assets/imgs/accessibility_icons/interprete libras.svg"
              alt="Pound interpreter icon"
            />
          </div>
          <div class="locality">
            <span>Locality: </span><span>...</span>
          </div>
        </footer>
      </div>
    `
    filterArray[index].idvaga ++
    searchResult.appendChild(card)
}


function resetSearchResult(){
  /* 
    Limpa os cards do container de pesquisa
  */
  searchResult.innerHTML = `
    <div style="margin: 5px; padding: 2px;">
      <h1>No stablishments found</h1>
    </div>
  `
}

function clearSearchResult(){
  /* 
    Limpa os cards do container de pesquisa
  */
  searchResult.innerHTML = ""
  
}