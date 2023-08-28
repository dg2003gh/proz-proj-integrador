let arrayCard = [
  {
    image: "/assets/imgs/stablishments/default.png",
    title: "Happyness Coffee Shop",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem assumenda accusantium suscipit veritatis ex, ducimus, totam quas quidem inventore similique at, cumque vel sunt! Nobis repellendus laborum eius et fugiat?",
  },
];

let scrollOld = window.scrollY;

body = document.querySelector("body");
body.addEventListener("load", loadCards());

function loadCards() {
  for (i = 0; i < 3; i++) {
    addCard();
  }

  window.addEventListener("scroll", function () {
    let scrollDown = false;
    // Verifica a direção do scroll
    if (scrollOld > window.scrollY) {
      scrollDown = false;
    } else {
      scrollDown = true;
    }

    // Verifica se scroll está
    // se movimentando para cima
    if (scrollDown) {
      if (ultCardDentroVP()) {
        addCard();
      }
    } else {
      if (ultCardForaVP()) {
        remCard();
      }
    }
    // Atualiza a última posição do scroll
    scrollOld = window.scrollY;
  });
}

function ultCardDentroVP() {
  /* Verifica se a base do último card está dentro da view port */

  // Container de pesquisa
  searchContainer = document.querySelector(
    "div#c-searching-container___result"
  );
  // Lista de cards
  cards = searchContainer.querySelectorAll("article");
  // Ultimo card
  ultCard = cards[cards.length - 1];

  // Posição y da base do último card
  ultCardPBOTT = ultCard.getBoundingClientRect().bottom;
  // Altura da viewport
  alturaVP = window.innerHeight;

  // Verifica se posição da base do
  // último card é menor que a altura da viewport
  if (ultCardPBOTT <= alturaVP) return true;
  else return false;
}

function ultCardForaVP() {
  /* Verifica se a base do último card está dentro da view port */

  // Container de pesquisa
  searchContainer = document.querySelector(
    "div#c-searching-container___result"
  );
  // Lista de cards
  cards = searchContainer.querySelectorAll("article");
  // Ultimo card
  ultCard = cards[cards.length - 1];
  // Posição y da base do último card
  ultCardPTOP = ultCard.getBoundingClientRect().top;
  // Altura da viewport
  alturaVP = window.innerHeight;

  // Verifica se posição da base do
  // último card é menor que a altura da viewport
  if (ultCardPTOP >= alturaVP * 0.85) return true;
  else return false;
}

function addCard() {
  // Get search container result
  searchContainer = document.querySelector(
    "div#c-searching-container___result"
  );
  card = document.createElement("article");
  card.setAttribute("class", "c-searching__card");
  card.innerHTML += `
      <aside><img class="c-searching-container__image" src="${arrayCard[0].image}" alt="Establishment image"></aside>
      <main class="c-searching-container__card-information">
        <header>
          <h2>${arrayCard[0].title}</h2>
        </header>
        <main>
          <p>${arrayCard[0].description}</p>
        </main>
        <footer class="c-searching-container__footer">
          <div id="rank">
              <span>Rank: </span>
              <i class="ri-star-line"></i>
              <i class="ri-star-line"></i>
              <i class="ri-star-line"></i>
              <i class="ri-star-line"></i>
              <i class="ri-star-line"></i>
          </div>
          <div id="suport">
            <span>Suport</span>
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
          <div id="locality">
            <span>Locality: </span><span>...</span>
          </div>
        </footer>
      </main>
    `;
  searchContainer.appendChild(card);
}

function remCard() {
  // Get search container result
  searchContainer = document.querySelector(
    "div#c-searching-container___result"
  );
  cardList = searchContainer.querySelectorAll("article");
  // Remove the last card
  searchContainer.removeChild(cardList[cardList.length - 1]);
}
