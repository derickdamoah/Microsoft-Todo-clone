document
  .querySelector("button.open-sidebar > span")
  .addEventListener("click", openSidebar);

  const aside = document.querySelector("div.container2.aside-content");
  const mainContent = document.querySelector("div.container2.main-content");
  const container1 = document.querySelector("div.container1");
  const closeSidebarButton = document.querySelector(
    "div.container2.aside-content > button.close-sidebar"
  );
  const asideElement = document.querySelector("aside.aside-container");

function openSidebar(event) {
  aside.setAttribute("id", "aside-sidebar")
  mainContent.setAttribute("id", "mainContent-aside")
  container1.setAttribute("id", "container1-aside")

  closeSidebarButton.firstElementChild.addEventListener("click", closeSidebar)
}

function closeSidebar(){
  aside.removeAttribute("id", "aside-sidebar")
  mainContent.removeAttribute("id", "mainContent-aside")
  container1.removeAttribute("id", "container1-aside")
}


window.addEventListener("resize", function(){
  if(this.window.innerWidth > 600) closeSidebar()
})