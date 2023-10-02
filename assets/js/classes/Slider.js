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

    document.onload = this.#changeCard();
  }

  #changeCard() {
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
                <footer> 
                <span
                class="u-row-container u-margin u-gap"
              >
                <i class="ri-star-fill"></i>
                <i class="ri-star-fill"></i>
                <i class="ri-star-fill"></i>
                <i class="ri-star-fill"></i>
                <i class="ri-star-fill"></i>
              </span>
              </footer> 
              </div>
`;
    slideContainer.appendChild(this.slideCard);
  }

  #previousSlide() {
    if (this.count < 0) return;
    this.#changeCard();
    --this.count;
  }

  #nextSlide() {
    if (this.count >= this.dataBase.length) {
      this.count = 0;
      return;
    }
    this.#changeCard();
    ++this.count;
  }
}
