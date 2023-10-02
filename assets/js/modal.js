function toggleModal(modalTag) {
  const overlay = document.querySelector("#overlay");
  let previousModal = document.querySelector(".c-modal.u-visible");

  if (modalTag == null) return;
  else if (previousModal == null || previousModal == modalTag) {
  } else {
    previousModal.classList.remove("u-visible");
  }

  overlay.setAttribute("data-modal-target", `#${modalTag.id}`);

  modalTag.classList.toggle("u-visible");

  if (modalTag.classList.contains("u-visible")) {
    overlay.classList.add("u-visible");
    document.body.classList.add("u-overflow-hidden");
  } else {
    overlay.classList.remove("u-visible");
    document.body.classList.remove("u-overflow-hidden");
  }
}

document.querySelectorAll("[data-modal-target]").forEach((element) => {
  element.addEventListener("click", () => {
    let modalTag = document.querySelector(element.dataset.modalTarget);

    toggleModal(modalTag);
  });
});
