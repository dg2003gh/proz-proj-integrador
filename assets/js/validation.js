const formInputs = document.querySelectorAll(".c-modal input");
const errorFieldContainer = document.querySelector(
  ".c-modal .c-modal__error-field-container"
);
const errorField = errorFieldContainer.querySelector(".c-modal__error-field");
const errorMessages = {
  isEmpty: "Inputs are empty! Please, fill them.",
  emailInvalid: "Your E-mail is invalid!",
  passwordInvalid:
    "your password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!",
};
const emailRexExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRexExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const isEstablishmentOwner = document.getElementById("c-IsAEstablishmentOwner");

function inputEmpty(input) {
  input.classList.add("u-input-error");
  input.classList.remove("u-input-correct");
  errorFieldContainer.classList.add("u-visible");
  errorField.textContent = errorMessages.isEmpty;
}

function emailValidation(input) {
  input.classList.add("u-input-error");
  input.classList.remove("u-input-correct");
  errorFieldContainer.classList.add("u-visible");
  errorField.textContent = errorMessages.emailInvalid;
}

function passwordValidation(input) {
  input.classList.add("u-input-error");
  input.classList.remove("u-input-correct");
  errorFieldContainer.classList.add("u-visible");
  errorField.textContent = errorMessages.passwordInvalid;
}

formInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    if (input.value == "" || null) {
      inputEmpty(input);
    } else if (input.type == "email" && !input.value.match(emailRexExp)) {
      emailValidation(input);
    } else if (
      input.classList.contains("js-password-input") &&
      !input.value.match(passwordRexExp)
    ) {
      passwordValidation(input);
    }

    input.classList.toggle("u-input-correct");
  });
});

isEstablishmentOwner.addEventListener("click", () => {
  const establishmentOwnerContainer = document.getElementById(
    "c-owner-id-container"
  );
  const userDisability = document.getElementById("c-userDisability-container");
  if (isEstablishmentOwner.checked) {
    establishmentOwnerContainer.classList.remove("u-display-none");
    userDisability.classList.add("u-display-none");
  } else {
    establishmentOwnerContainer.classList.add("u-display-none");
    userDisability.classList.remove("u-display-none");
  }
});
