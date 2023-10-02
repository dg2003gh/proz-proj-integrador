const slideButtons = document.querySelectorAll(".c-slider__button");
const slideContainer = document.querySelector(".c-slider__content-container");
const numberOfCards = 2;
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

const slider = new Slider(slideButtons, slideContainer, dataBase);
slider.init();
