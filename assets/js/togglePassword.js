const passwordToggle = document.querySelectorAll(".c-modal__toggle-password");
const passwordInputList = document.querySelectorAll(
  ".c-modal__password-container input"
);

passwordToggle.forEach((element, index) => {
  element.addEventListener("click", () => {
    let passwordInput = passwordInputList[index];

    if (
      passwordInput.type === "password" &&
      element.classList.contains("ri-eye-line")
    ) {
      passwordInput.type = "text";
      element.classList.replace("ri-eye-line", "ri-eye-off-line");
    } else {
      passwordInput.type = "password";
      element.classList.replace("ri-eye-off-line", "ri-eye-line");
    }
  });
});
