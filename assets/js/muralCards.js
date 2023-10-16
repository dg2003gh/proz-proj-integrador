import NewsCard from "./classes/NewsCard";

const muralGrid = document.querySelector("#js-mural_section");

const newsKey = () => {
  return "";
};

const cardCount = 5;
function displayMoreCards() {
  for (let index = 0; cardCount > index; index++) {
    const card = new NewsCard("accessibility", muralGrid, newsKey());
    card.showCard();
  }
}

displayMoreCards();
