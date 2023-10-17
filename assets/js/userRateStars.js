const userRateStars = document.querySelectorAll(
  "#js-card__user-rate-container i"
);

userRateStars.forEach((star, hoveredStarIndex) => {
  star.addEventListener("mouseover", () => {
    userRateStars.forEach((star, index) => {
      if (index <= hoveredStarIndex) {
        star.style.color = "var(--clr-highlight)";
      } else {
        star.style.color = "black";
      }
    });
  });
});
