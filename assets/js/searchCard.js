let arrayCard = [
  {
    image: "",
    title: "Happyness Coffee Shop",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem assumenda accusantium suscipit veritatis ex, ducimus, totam quas quidem inventore similique at, cumque vel sunt! Nobis repellendus laborum eius et fugiat?",
  },
];

body = document.querySelector("body");
body.addEventListener("load", loadCards());

function loadCards() {
  for (i = 0; i < 3; i++) {
    addCard();
  }
  window.addEventListener("scroll", scrollMove);
}

function scrollMove() {
  // print "false" if direction is down and "true" if up
  scrUp = this.oldScroll > this.scrollY;
  this.oldScroll = this.scrollY;

  // Check if scroll is moving down
  if (!scrUp) {
    if (temCard()) {
      addCard();
    }
  }
  // Else, scroll is movin up
  else {
    if (!temCard()) {
      remCard();
    }
  }
}

function temCard() {
  searchContainer = document.querySelector(
    "div#c-searching-container___result"
  );
  cards = searchContainer.querySelectorAll("article");
  ultCard = cards[cards.length - 1];
  ultCardPTOP = ultCard.getBoundingClientRect().top;
  ultCardPBOTT = ultCard.getBoundingClientRect().bottom;
  alturaVP = window.innerHeight;

  if (ultCardPBOTT < alturaVP) result = true;
  else result = false;

  console.log(result);
  return result;
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

function ultCartAbaixo() {
  elementos = searchContainer.querySelectorAll("article");
  ultCard = elementos[elementos.length - 1];
  ultCardPTOP = ultCard.getBoundingClientRect().top;
  ultCardPBOTT = ultCard.getBoundingClientRect().bottom;
  alturaVP = window.innerHeight;

  alert(alturaVP);
  alert(ultCardPTOP);
  alert(ultCardPBOTT);

  alert(ultCardPBOTT > alturaVP);
}
