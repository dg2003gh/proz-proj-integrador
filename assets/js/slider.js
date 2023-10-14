const slideButtons = document.querySelectorAll(".c-slider__button");
const slideContainer = document.querySelector(".c-slider__content-container");
const dataBase = [
  {
    image: "",
    title: "ewqeq",
    text: "cgzdvjfsakjfgkjdsfghdgsfjhgfsdj",
    rate: 2,
  },
  {
    image: "",
    title: "titltwdskag",
    text: "ewqewqewq",
    rate: 5,
  },
  {
    image: "",
    title: "teqwewqewq",
    text: "dsadsadsa",
    rate: 3,
  },
  {
    image: "",
    title: "teqwedsadsawqewq",
    text: "dsadsadsa",
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
}, 10000);

document.onload = setCard();

function previousSlide() {
  slideContainer.innerHTML = "";
  if (count < 0) return;
  setCard();
  --count;
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
    "c-card c-card__slide-card u-margin u-border-radius u-tertiary-bg-color"
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
              </footer> 
              </div>
`;

  slideContainer.appendChild(slideCard);
}
