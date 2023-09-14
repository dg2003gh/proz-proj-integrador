// Barra de pesquisa
let searchBar = document.querySelector("input.ri-search-line");
// Botão de pesquisa
let searchButton = document.querySelector("button#header_search_button");

// Container de pesquisa
let searchContainer = document.querySelector("div.c-searching-container");

// Resultado da pesquisa
let searchResult = searchContainer.querySelector("div.c-searching-container__result");

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

searchBar.onkeyup = (e)=>{
  // Texto de pesquisa
  searchText = e.target.value;
  
  if(searchText){
    searchButton.onclick = ()=>{
      console.log(searchText);
      // Verifica se o usuário não está ja página de pesquisa
      if (!(window.location.pathname === "/assets/html/searchPage.html")){
        // Redireciona para página de pesquisa
        window.location.href = "./searchPage.html"
      }
      
    }
  }
  
};
