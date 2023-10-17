const infoContainer = document.getElementById(
  "js-establishment-info-container"
);

const db = [
  {
    mainPhoto: "",
    photos: [],
    title: "Happy Cafeteria",
    description: `A comfortable place for you and your whole family. <br />Our
              facilities have ramps, a room for guide dogs menus...`,
    rate: 4,
    support: [],
    location: "Rua Olindo de araújo, sp, Brasil",
    inaugurationDate: "10/01/2010",
  },
];

function showMoreDescription() {
  let descriptionChars = 100;
  const descriptionContainer = document.getElementById(
    "c-description-container"
  );

  descriptionChars == 100 ? (descriptionChars = 10) : (descriptionChars = 100);

  descriptionContainer.innerText.slice(0, 10 | 100);
  console.log(descriptionChars, descriptionContainer.innerText);
}

function setEstablishmentInfo() {
  infoContainer.innerHTML = `
<article class="u-tertiary-bg-color u-border-radius u-column-container">
<header id="c-establishment-info__header" class="u-position-relative">
            <div class="u-overlay u-mouse-over" data-modal-target="#c-more-photo-modal">
              See more photos
            </div>
          </header>
          <div class="u-text-center">
            <h2 class="u-margin">${db[0].title}</h2>
            <p id="c-description-container">
                ${db[0].description}
            </p>
            <strong
              class="u-highlight-color u-mouse-over"
              id="c-description-container__see-more-button"
              onclick="showMoreDescription()"
            >
              See More
            </strong>
          </div>
          <footer
            class="u-row-container u-center u-gap u-margin u-mobile__container"
          >
            <span id="c-establishment-info__stars">
              <small>Ranking:</small>
            </span>
            <span class="u-row-container u-center">
              Support:
              <img
                src="../imgs/accessibility_icons/deficiência visual.svg"
                alt="Icone de Deficiência Visual"
                width="40"
                height="40" />
              <img
                src="../imgs/accessibility_icons/D Auditiva.svg"
                alt="Icone de Deficiencia Auditiva"
                width="40"
                height="40" />
              <img
                src="../imgs/accessibility_icons/espectro autista.svg"
                alt="Icone de Espectro Autista"
                width="40"
                height="40" />
              <img
                src="../imgs/accessibility_icons/cão guia.svg"
                alt="Icone de Cão Guia"
                width="40"
                height="40"
            /></span>
            Location: ${db[0].location}<button class="u-accept-color u-mouse-over">
              View on maps<i class="ri-arrow-right-fill"></i></button
            >
            <span>
              Inauguration date: ${db[0].inaugurationDate}
            </span>
          </footer>
        </article>

`;
  setBackgroundPhoto();
  setRate();
}

function setBackgroundPhoto() {
  const header = document.getElementById("c-establishment-info__header");

  header.style = `
    background-image: url("../imgs/establishments/green_vegan_restaurant.png");
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 250px;
    width: 100%;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  `;
}

function setRate() {
  const rateContainer = document.getElementById("c-establishment-info__stars");
  for (let index = 0; index < 5; ++index) {
    let star = '<i class="ri-star-fill"></i>';
    if (index < db[0].rate) {
      star = '<i class="ri-star-fill u-highlight-color"></i>';
    }
    rateContainer.innerHTML += star;
  }
}

setEstablishmentInfo();
