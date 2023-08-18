function toggleModal(modalTag) {
  const overlay = document.querySelector("#overlay");

  if (modalTag == null) return;

  modalTag.classList.toggle("u-visible");
  overlay.classList.toggle("u-visible");
  overlay.setAttribute("data-modal-target", `#${modalTag.id}`);
}

document.querySelectorAll("[data-modal-target]").forEach((element) => {
  element.addEventListener("click", () => {
    let modalTag = document.querySelector(element.dataset.modalTarget);
    toggleModal(modalTag);
  });
});
