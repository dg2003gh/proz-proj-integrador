const commentsBd = [
  {
    userName: "Juliano",
    userComment: "Ótimo lugar, perfeito! Mas não atende minha deficiência. ",
    userRate: 4,
  },
  {
    userName: "andré",
    userComment: "Maravilha de cafeteria!",
    userRate: 5,
  },
  {
    userName: "Lucas",
    userComment: "Não gostei :/",
    userRate: 2,
  },
];

commentsBd.forEach((user, index) => {
  const commentsContainer = document.getElementById("js-comments-container");
  commentsContainer.innerHTML += `
    <article
                class="u-row-container u-full-width c-card u-tertiary-bg-color u-border-radius u-padding u-gap u-vertical-center"
            >
                <span class="u-column-container u-center">
                <img
                    alt=""
                    src="../imgs/icons/user.svg"
                    width="150px"
                    height="150px"
                />
                <label for="commentary_textarea_commentary_section">
                    ${commentsBd[index].userName}
                </label>
                </span>
                <span class="u-column-container u-center u-full-width">
                <span
                    readonly
                    class="c-card__text-input u-full-width u-margin u-text-center"
                >
                    ${commentsBd[index].userComment}
                </span>
                <footer>
                    ${setRate(index)}
                </footer>
                </span>
            </article>
`;
});

function setRate(bdIndex) {
  const starsContainer = document.createElement("span");
  starsContainer.class = "u-row-container u-gap c-card__rate-container";
  starsContainer.innerHTML = "<small>Establishment rate: </small>";

  for (let index = 0; index < 5; ++index) {
    let star = '<i class="ri-star-fill"></i>';

    if (index < commentsBd[bdIndex].userRate) {
      star = '<i class="ri-star-fill u-highlight-color"></i>';
    }

    starsContainer.innerHTML += star;
  }
  return starsContainer.outerHTML;
}
