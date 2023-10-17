import NewsCard from "./classes/NewsCard.js";

const muralGrid = document.querySelector("#js-mural_section");
const moreCardsButton = document.getElementById("c-show-more-cards-button");
const newsKey = () => {
  return "";
};

function displayMoreCards() {
  const card = new NewsCard("accessibility", muralGrid, newsKey(), 24);
  card.showCard();
}

moreCardsButton.addEventListener("click", displayMoreCards);

displayMoreCards();
