const collectionTitleLabel = document.querySelector("[for=collectionTitle]");
const collectionTitleInput = document.querySelector("#collectionTitle");
const dataErrorInput =
  collectionTitleInput.parentElement.getAttribute("data-error");

if (collectionTitleInput.value == "") {
  collectionTitleLabel.addEventListener("click", hideCollectionTitleLabel);
} else {
  hideCollectionTitleLabel();
}

if (!dataErrorInput) {
  collectionTitleInput.parentElement.removeAttribute("data-error");
} else {
  hideCollectionTitleLabel();
}

function hideCollectionTitleLabel() {
  collectionTitleLabel.style.display = "none";
  collectionTitleInput.style.display = "inline";
}
