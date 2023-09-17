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
let filterArrayTags = [];
let filterArrayTitle = [];
let filterArrayDescription = [];
let filterFinalArray = [];

// Cards fictícios
let arrayCard = [
  {
    "image": "/assets/imgs/stablishments/happiness_coffee_shop.png",
    "title": "Happiness Coffee Shop",
    "description": "A comfortable place for you and your whole family. Our facilities have ramps, a room for guide dogs, menus in Pounds version...",
   "tags": ["#stab_coffee-shop", "#desa_visual", "#desa_physical-motor"]
  },
  {
    "image": "/assets/imgs/stablishments/zursky_tech.png",
    "title": "Zurski Tech",
    "description": "A comfortable place for you and your whole family. Our facilities have ramps, a room for guide dogs, menus in Pounds version...",
   "tags": ["#stab_company", "#desa_visual", "#desa_hearing", "#desa_physical-motor"]
  },
  {
    "image": "/assets/imgs/stablishments/green_vegan_restaurant.png",
    "title": "Green Vegan Restaurant",
    "description": "A comfortable place for you and your whole family. Our facilities have ramps, a room for guide dogs, menus in Pounds version...",
   "tags": ["#stab_restaurant", "#desa_visual", "#desa_hearing", "#desa_physical-motor"]
  },
  {
    "image": "/assets/imgs/stablishments/gold_hotel.png",
    "title": "Gold Hotel",
    "description": "A comfortable place for you and your whole family. Our facilities have ramps, a room for guide dogs, menus in Pounds version...",
   "tags": ["#stab_hotel", "#desa_hearing", "#desa_physical-motor"]
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

      // Filtra cards pelo título
      filterArrayTitle = arrayCard.filter((card)=>{
        const re = new RegExp(searchText.toLowerCase());
        return (re.test(card.title.toLowerCase()));
      })

      // Filtra cards pela descrição, desconsiderando os cards que foram encontrados pelo título
      filterArrayDescription = arrayCard.filter((card)=>{
        const re = new RegExp(searchText.toLowerCase());
        return re.test(card.description.toLowerCase()) && !re.test(card.title.toLowerCase());
      })

      filterFinalArray =  filterArrayTitle.concat(filterArrayDescription)

      console.log(filterFinalArray)
      for (i in filterFinalArray){
        addCard(i);
      }
    }
  }
};

// Adiciona o evento clearCards em todas as tags de pesquisa
// Na lista há uma função entries() que não sei o que é...
tags = document.querySelectorAll("span.tag")
for (let pos=0; pos < tags.length; pos++){
  tags[pos].addEventListener("click", clearSearchResult)
}

function addCard(index){
    // Get search container result
    card = document.createElement("article")
    card.setAttribute("class", "c-searching__card")
    card.innerHTML += `
      <aside>
        <img class="c-searching-container__image" src="${filterFinalArray[index].image}" alt="Establishment image">
      </aside>
      <div class="c-searching-container__card-information u-column-container u-space-between">
        <header>
          <h2>${filterFinalArray[index].title}</h2>
        </header>
        <div>
          <p>${filterFinalArray[index].description}</p>
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
    filterFinalArray[index].idvaga ++
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