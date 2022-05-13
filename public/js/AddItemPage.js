
const titleLabel = document.querySelector("[for=title]")
const descriptionLabel = document.querySelector("[for=description]")
const titleInput = document.querySelector(".container3 >input[type=text]")
const descriptionInput = document.querySelector("textarea")
const dataErrorTitle =  titleInput.parentElement.getAttribute("data-error")
const dataErrorDescription = descriptionInput.parentElement.getAttribute("data-error")

if(titleInput.value == ""){
    titleLabel.addEventListener("click", hideTitleLabel)
} else {
    hideTitleLabel()
}

if(descriptionInput.value == ""){
    descriptionLabel.addEventListener("click", hideDescriptionLabel)
} else {
    hideDescriptionLabel()
}


if(!dataErrorTitle){
    titleInput.parentElement.removeAttribute("data-error")
} else {
    hideTitleLabel()
}

if(!dataErrorDescription){
    descriptionInput.parentElement.removeAttribute("data-error")
} else {
    hideDescriptionLabel()
}

function hideTitleLabel() {
    titleLabel.style.display = "none"
    titleInput.style.display = "block"
}

function hideDescriptionLabel(){
    descriptionLabel.style.display = "none"
    descriptionInput.style.display = "block"
}




