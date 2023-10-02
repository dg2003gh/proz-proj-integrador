import { newsKey } from "../keys/key.json";
const muralGrid = document.querySelector("#js-mural_section");

document.addEventListener("scroll", () => {
  const card = new NewsCard("accessibility", muralGrid, newsKey);
  card.showCard();
});
