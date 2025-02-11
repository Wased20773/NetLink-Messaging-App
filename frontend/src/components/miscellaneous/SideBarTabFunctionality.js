export function openTab(evt, tabName) {
  console.log("Clicked on", tabName);
  //   Hide all tab contents
  const tabContents = document.getElementsByClassName("tabcontent");

  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }

  // Remove 'active' class from all tab links
  const tabLinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }

  // Show the current tab and add 'active' class to the clicked tab
  document.getElementById(tabName).style.display = "flex";

  evt.currentTarget.className += " active";
}
