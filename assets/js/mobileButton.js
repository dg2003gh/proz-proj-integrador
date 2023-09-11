const buttonsContainer = document.querySelector(
  ".c-site-header__buttons-container "
);

if (window.innerWidth < 768) {
  const mobileButton = document.getElementById("c-site-header__mobile-button");

  mobileButton.addEventListener("click", () => {
    buttonsContainer.style.transform = "translate(-50%, -50%) scale(1)";
    document.body.classList.add("u-overflow-hidden");
  });

  buttonsContainer.addEventListener("click", () => {
    buttonsContainer.style.transform = "scale(0)";
    document.body.classList.remove("u-overflow-hidden");
  });
}
