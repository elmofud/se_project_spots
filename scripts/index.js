const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileFormEl = editProfileModal.querySelector(".modal__form");
const editProfileDescriptionInput =
  editProfileModal.querySelector("#description-input");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const addCardFormEl = newPostModal.querySelector(".modal__form");
const newPostCaptionInput = addCardFormEl.querySelector("#caption-input");
const newPostLinkInput = addCardFormEl.querySelector("#image-link-input");

function openCloseModal(modalType, modalState) {
  if (modalState === "open") {
    modalType.classList.add("modal_is-opened");
  } else {
    modalType.classList.remove("modal_is-opened");
  }
}

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openCloseModal(editProfileModal, "open");
});

editProfileCloseBtn.addEventListener("click", function () {
  openCloseModal(editProfileModal, "close");
});

newPostBtn.addEventListener("click", function () {
  openCloseModal(newPostModal, "open");
});

newPostCloseBtn.addEventListener("click", function () {
  openCloseModal(newPostModal, "close");
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  openCloseModal(editProfileModal, "close");
  console.log("submitting");
}

editProfileFormEl.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log(newPostCaptionInput.value);
  console.log(newPostLinkInput.value);
  openCloseModal(newPostModal, "close");
}

addCardFormEl.addEventListener("submit", handleAddCardSubmit);
