const muralGrid = document.querySelector("#js-mural_section");
const newsKey = () => {
  return "e81b33b2828647d0887a4ea12e9ff25a";
};

document.addEventListener("scroll", () => {
  const card = new NewsCard("accessibility", muralGrid, newsKey());
  card.showCard();
});
