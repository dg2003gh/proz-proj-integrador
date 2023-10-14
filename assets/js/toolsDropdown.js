const toolsDropDown = document.getElementById("c-tools-dropdown");

function toggleToolsDropdown() {
  const toolsDropDownMenu = document.getElementById("c-tools-dropdown__menu");
  toolsDropDownMenu.classList.toggle("visible");
}
toolsDropDown.onclick = toggleToolsDropdown;
