const modalDiv = document.querySelector("#delete-popup");
const deleteTaskButton = document.querySelectorAll(".delete-item");

[...document.querySelectorAll(".delete-collection")].map((x) =>
  x.addEventListener("click", getInfo)
);

deleteTaskButton.forEach((button) => {
  button.addEventListener("click", getInfo);
});

function getInfo(event) {
  let container = event.target.parentElement.parentElement.parentElement;

  if (container.classList.contains("collection-items")) {
    let collectionTitle = container.querySelector("a.title").innerText;
    let taskCollection = "collection";
    changeText(collectionTitle, taskCollection);
  } else {
    let taskTitle = container.querySelector(".title").innerText;
    let taskCollection = "task";
    changeText(taskTitle, taskCollection);
  }

  showModal(container);
}

function changeText(collectionTitle, taskCollection) {
  document.querySelector(
    ".modal-title"
  ).textContent = `Delete ${taskCollection}`;
  document.querySelector(
    ".modal-paragraph"
  ).textContent = `"${collectionTitle}" will be permanently deleted`;
}

function showModal(taskContainer) {
  modalDiv.style.display = "block";
  document.querySelector(".close-button").addEventListener("click", hideModal);
  document.querySelector(".cancel-button").addEventListener("click", hideModal);
  let deleteButton = document.querySelector(".delete-button");
  deleteButton.addEventListener("click", deleteTask);
  deleteButton.parameter = taskContainer;
}

function hideModal() {
  modalDiv.style.display = "none";
  modalDiv.querySelector(".modal-title").textContent = "";
  modalDiv.querySelector(".modal-paragraph").textContent = "";
}

function deleteTask(event) {
  let taskContainer = event.target.parameter;
  taskContainer.querySelector("form").submit();
}
