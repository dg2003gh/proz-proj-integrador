// Barra de pesquisa
const searchBar = document.querySelector("input.ri-search-line");
// Botão de pesquisa
const searchButton = document.querySelector("button#header_search_button");

// Container de pesquisa
const searchContainer = document.querySelector("div.c-searching-container");

// Resultado da pesquisa
const searchResult = searchContainer.querySelector("div.c-searching-container__result");

let arrayCard = [
  {
    "image": "/assets/imgs/stablishments/default.png",
    "title": "Happiness Coffee Shop",
    "description": "A comfortable place for you and your whole family. Our facilities have ramps, a room for guide dogs, menus in Pounds version..."
  },
  {
    "image": "/assets/imgs/stablishments/default.png",
    "title": "Zurski Tech",
    "description": "A comfortable place for you and your whole family. Our facilities have ramps, a room for guide dogs, menus in Pounds version..."
  },
  {
    "image": "/assets/imgs/stablishments/default.png",
    "title": "Green Vegan Restaurant",
    "description": "A comfortable place for you and your whole family. Our facilities have ramps, a room for guide dogs, menus in Pounds version..."
  }
];

filterArray = [];

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


let scrollOld = window.scrollY

body = document.querySelector("body")

// Adiciona o evento clearCards em todas as tags de pesquisa
// Na lista há uma função entries() que não sei o que é...
tags = document.querySelectorAll("span.tag")
for (let pos=0; pos < tags.length; pos++){
  tags[pos].addEventListener("click", clearCards)
}

// window.addEventListener("scroll", function() {

//   scrollDirec = getScrollDirection()
//   // Verifica se scroll está 
//   // se movimentando para baixo ou para cima
//   if (scrollDirec == "down") {
//     if (ultCardDentroVP()) {
//       addCard()
//     }
//   }
//   else if (scrollDirec == "up") {
//     if (ultCardForaVP()) {
//       remCard()
//     }
//   }
//   // Atualiza a última posição do scroll
//   scrollOld = window.scrollY
// })

// Carrega os cards ao carregar a página
function loadCards(){
  for (i=0; i<3; i++){
    addCard()
  }
}

// Retorna a direção do scroll
function getScrollDirection(){
  // Verifica a direção do scroll
  if (scrollOld > window.scrollY){
    return "up"
  }
  else{
    return "down" 
  }
}

function ultCardDentroVP(){
  /* Verifica se a base do último card está dentro da view port */

  // Lista de cards
  cards = searchContainer.querySelectorAll("article")
  // Ultimo card
  ultCard = cards[cards.length-1]

  // Posição y da base do último card
  ultCardPBOTT = ultCard.getBoundingClientRect().bottom
  // Altura da viewport
  alturaVP = window.innerHeight

  // Verifica se posição da base do 
  // último card é menor que a altura da viewport
  if (ultCardPBOTT <= alturaVP)
    return true
  else
    return false
}

function ultCardForaVP(){
  /* Verifica se a base do último card está dentro da view port */

  // Lista de cards
  cards = searchContainer.querySelectorAll("article")
  // Ultimo card
  ultCard = cards[cards.length-1]
  // Posição y da base do último card
  ultCardPTOP = ultCard.getBoundingClientRect().top
  // Altura da viewport
  alturaVP = window.innerHeight

  // Verifica se posição da base do 
  // último card é menor que a altura da viewport
  if (ultCardPTOP >= alturaVP * 0.85)
    return true
  else
    return false
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
    searchContainer.appendChild(card)
}

function remCard(){
    // Get search container result
    cardList = searchContainer.querySelectorAll("article")
    // Remove the last card
    searchContainer.removeChild(cardList[cardList.length -1])
}

function clearCards(){
  /* 
    Limpa os cards do container de pesquisa
  */
  searchResult.innerHTML = `
    <div style="margin: 5px; padding: 2px;">
      <h1>No stablishments found</h1>
    </div>
  `
}