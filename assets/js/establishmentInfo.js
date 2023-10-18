import database from "./fictionalDataBase.js";

const establishmentIndex = localStorage.getItem("establishmentIndex");
console.log(establishmentIndex);
function showMoreDescription() {
  let descriptionChars = 100;
  const descriptionContainer = document.getElementById(
    "c-description-container"
  );

  descriptionChars == 100 ? (descriptionChars = 10) : (descriptionChars = 100);

  descriptionContainer.innerText.slice(0, descriptionChars);
}

function setBackgroundPhoto() {
  const header = document.getElementById("c-establishment-info__header");
  console.log(database[establishmentIndex].image);
  header.style = `
    background-image: url(${database[establishmentIndex].image});
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
    if (index < database[establishmentIndex].rate) {
      star = '<i class="ri-star-fill u-highlight-color"></i>';
    }
    rateContainer.innerHTML += star;
  }
}

function setEstablishmentInfo() {
  const infoContainer = document.getElementById(
    "js-establishment-info-container"
  );
  infoContainer.innerHTML = `
<article class="u-tertiary-bg-color u-border-radius u-column-container">
<header id="c-establishment-info__header" class="u-position-relative">
            <div class="u-overlay u-mouse-over" data-modal-target="#c-more-photo-modal">
              See more photos
            </div>
          </header>
          <div class="u-text-center">
            <h2 class="u-margin">${database[establishmentIndex].title}</h2>
            <p id="c-description-container">
                ${database[establishmentIndex].description}
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
            />
          </span>
          <span class="u-text-center">
            Location: ${database[establishmentIndex].address}
            </span><button class="u-accept-color u-mouse-over">
              View on maps<i class="ri-arrow-right-fill"></i></button
            >

            <span>
              Inauguration date: ${database[establishmentIndex].inaugurationDate}
            </span>
          </footer>
        </article>

`;
  setBackgroundPhoto();
  setRate();
}

setEstablishmentInfo();
