class Slider {
  constructor(slideButtons, buttonsContainer, dataBase) {
    this.slideButtons = slideButtons;
    this.buttonsContainer = buttonsContainer;
    this.dataBase = dataBase;
    this.count = 0;
    this.slideCard = document.createElement("article");
  }

  init() {
    this.slideButtons[0].addEventListener("click", this.#previousSlide);

    this.slideButtons[1].addEventListener("click", this.#nextSlide);

    setInterval(() => {
      if (this.count > this.dataBase.length) {
        this.count = 0;
      }
      this.#nextSlide();
    }, 5000);

    document.onload = this.#setCard();
  }

  #previousSlide() {
    if (this.count < 0) return;
    this.#setCard();
    --this.count;
  }

  #nextSlide() {
    if (this.count >= this.dataBase.length) {
      this.count = 0;
      return;
    }
    this.#setCard();
    ++this.count;
  }
  /* 
  #setStars() {
    const starsContainer = document.createElement("span");
    starsContainer.setAttribute("class", "u-row-container u-margin u-gap");

    for (let stars = 0; stars < this.dataBase[this.count].stars; ++stars) {
      let star = document.createElement("i");
      star.classList.add("ri-star-fill");
      if (stars < this.dataBase[this.count].stars) {
        star.classList.add("active");
      }
      starsContainer.appendChild(star);
    }
  } */

  #setCard() {
    this.slideCard.setAttribute(
      "class",
      "c-card u-margin u-border-radius u-tertiary-bg-color"
    );
    this.slideCard.innerHTML = `
              <aside class="c-card__aside">
                <img
                  class="c-card__img"
                  src="${this.dataBase[this.count].image}"
                  width="200"
                  alt=""
                />
              </aside>
              <div
                class="c-card__main-content u-column-container u-center u-text-center u-padding"
              >
              <h2 class="c-card__title">${this.dataBase[this.count].title}</h2>
                <p class="c-card__text">
                  ${this.dataBase[this.count].text}
                </p>
                <footer class="c-card__footer"> 
              </footer> 
              </div>
`;

    slideContainer.appendChild(this.slideCard);
  }
}
