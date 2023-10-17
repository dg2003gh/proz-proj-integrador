document.addEventListener("keydown", ({ key }) => {
  const modal = document.querySelector(".c-modal.u-visible");
  const overlay = document.getElementById("overlay");
  const searchInput = document.getElementById("c-search_input");
  const searchButton = document.getElementById("c-search_button");
  const toolsDropdownButton = document.getElementById("c-tools-dropdown");

  switch (key) {
    case "Escape":
      if (modal != null) {
        modal.classList.remove("u-visible");
        overlay.classList.remove("u-visible");
      }
      break;
    case "b":
      toggleToolsDropdown();
      break;
    case "Home":
      window.location.href = "../html/index.html";
      break;
    case "p":
      searchInput.focus();
      break;
    case "Enter":
      if (document.activeElement == searchInput) {
        searchButton.focus();
        searchButton.click();
      }
      break;
    case "Tab":
      if (modal != null) {
        modal.children.tabIndex = 5;
      }
      break;
    case "Enter":
      if (document.activeElement == toolsDropdownButton) {
        toolsDropdownButton.click();
      }
  }
});
