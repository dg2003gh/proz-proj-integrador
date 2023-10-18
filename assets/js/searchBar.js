import { SearchBar } from "./classes/SearchBar.js";
import fictionalDataBase from "./fictionalDataBase.js";

const searchBarElement = document.querySelector("input.ri-search-line");
const searchButtonElement = document.querySelector("button#c-search_button");
const searchResultElement = document.querySelector(
  "div#c-searching-container__result"
);
let tagList = document.querySelectorAll("span.js-tag");

const searchbar = new SearchBar(
  searchBarElement,
  searchButtonElement,
  searchResultElement,
  tagList,
  fictionalDataBase
);

if (!window.location.href.endsWith("searchPage.html")) {
  searchBarElement.onblur = () => {
    searchButtonElement.onclick = () => {
      localStorage.setItem("searchTxt", searchBarElement.value);
      localStorage.setItem("searchValue", true);
      window.location.assign("searchPage.html");
    };
  };
} else {
  let searchValue = localStorage.getItem("searchValue");
  if (searchValue) {
    searchBarElement.value = localStorage.getItem("searchTxt");
    searchbar.searchReturn();
    searchValue = false;
  }

  searchBarElement.onblur = () => {
    searchButtonElement.onclick = () => {
      localStorage.setItem("searchTxt", searchBarElement.value);
      searchbar.searchReturn();
    };
  };
}
