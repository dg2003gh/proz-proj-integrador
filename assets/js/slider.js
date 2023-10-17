const slideButtons = document.querySelectorAll(".c-slider__button");
const slideContainer = document.querySelector(".c-slider__content-container");
const dataBase = [
  {
    image: "../imgs/establishments/default.png",
    title: "Happy place restaurant",
    text: "The perfect place for you! ",
    rate: 2,
  },
  {
    image: "../imgs/establishments/green_vegan_restaurant.png",
    title: "Green vegan restaurant",
    text: "The prefect green and animal friendly place for you!",
    rate: 5,
  },
  {
    image: "../imgs/establishments/zursky_tech.png",
    title: "Zursky tech",
    text: "The best technology for the best people!",
    rate: 3,
  },
  {
    image: "../imgs/establishments/gold_hotel.png",
    title: "Gold Hotel",
    text: "Comfort and beauty, that's what you want, right? Well, that's your home then...",
    rate: 1,
  },
];

let count = 0;

slideButtons[0].addEventListener("click", previousSlide);

slideButtons[1].addEventListener("click", nextSlide);

setInterval(() => {
  slideContainer.innerHTML = "";
  if (count > dataBase.length) {
    count = 0;
  }
  nextSlide();
}, 5000);

document.onload = setCard();

function previousSlide() {
  if (count <= 0) return;
  setCard();
  --count;
  slideContainer.innerHTML = "";
}

function nextSlide() {
  slideContainer.innerHTML = "";
  if (count >= dataBase.length) {
    count = 0;
  }
  setCard();
  ++count;
}

function setCard() {
  const slideCard = document.createElement("a");

  slideCard.setAttribute(
    "class",
    "c-card c-slider__card u-margin u-border-radius u-tertiary-bg-color"
  );
  slideCard.innerHTML = `
              <aside class="c-card__aside">
                <img
                  class="c-card__img"
                  src="${dataBase[count].image}"
                  width="200"
                  alt=""
                />
              </aside>
              <div
                class="c-card__main-content u-column-container u-center u-text-center u-padding"
              >
              <h2 class="c-card__title">${dataBase[count].title}</h2>
                <p class="c-card__text">
                  ${dataBase[count].text}
                </p>
                <footer class="c-card__footer"> 
                  <span class="u-row-container u-gap c-card__rate-container">
                  </span>
              </footer> 
              </div>
`;

  slideContainer.appendChild(slideCard);
}
