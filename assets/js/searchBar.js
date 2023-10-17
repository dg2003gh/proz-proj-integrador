import { SearchBar } from "./classes/SearchBar.js";

// Barra de pesquisa
const searchBarElement = document.querySelector("input.ri-search-line");
// Botão de pesquisa
const searchButtonElement = document.querySelector("button#c-search_button");

// Resultado da pesquisa
const searchResultElement = document.querySelector(
  "div#c-searching-container__result"
);

// Tags
let tagList = document.querySelectorAll("span.js-tag");

// Cards fictícios
let arrayCard = [
  {
    "image": "/assets/imgs/establishments/happiness_coffee_shop.png",
    "title": "Happiness Coffee Shop",
    "description": "A comfortable place for you and your whole family. Our facilities have ramps, a room for guide dogs, menus in Pounds version...",
   "tags": ["#coffeeShop", "#visualDesability", "#physicalMotorDesability"],
   "tagsOcurrence": 0
  },
  {
    "image": "/assets/imgs/establishments/zursky_tech.png",
    "title": "Zurski Tech",
    "description": "If you want the best tecnology solutions, we can help you...",
   "tags": ["#company", "#visualDesability", "#hearingDesability", "#physicalMotorDesability"],
   "tagsOcurrence": 0
  },
  {
    "image": "/assets/imgs/establishments/green_vegan_restaurant.png",
    "title": "Green Vegan Restaurant",
    "description": "Our food can help you to care your health...",
   "tags": ["#restaurant", "#physicalMotorDesability"],
   "tagsOcurrence": 0
  },
  {
    "image": "/assets/imgs/establishments/gold_hotel.png",
    "title": "Gold Hotel",
    "description": "A comfortable place for you and your whole family. Our facilities have ramps, a room for guide dogs, menus in Pounds version...",
   "tags": ["#hotel", "#physicalMotorDesability"],
   "tagsOcurrence": 0
  }
];


const searchbar = new SearchBar(searchBarElement, 
  searchButtonElement, 
  searchResultElement,
  tagList,
  arrayCard)


if (!window.location.href.endsWith("searchPage.html")){
  console.log(window.location.href.endsWith("searchPage.html"))
  searchBarElement.onblur = ()=> {
    searchButtonElement.onclick = () =>{
      localStorage.setItem("searchTxt", searchBarElement.value);
      localStorage.setItem("redirecionado", true)
      window.location.assign("searchPage.html");
    }
  }
}
else{
  let redirecionado = localStorage.getItem("redirecionado")
  if (redirecionado){
    searchBarElement.value = localStorage.getItem("searchTxt");
    searchbar.searchReturn();
    redirecionado = false;
  }
 
  searchBarElement.onblur = ()=> {
    searchButtonElement.onclick = () =>{
      localStorage.setItem("searchTxt", searchBarElement.value);
      searchbar.searchReturn();
    }
  }
}
  
