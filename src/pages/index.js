import "./index.css";

import {
  settings,
  enableValidation,
  resetValidation,
  disabledBtn,
} from "../scripts/validation.js";

import Api from "../utils/Api.js";

/*const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];*/

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "be27ae25-a70e-4b32-aa61-c5f0207b9ede",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([me, cards]) => {
    console.log(cards);
    cards.forEach((item) => {
      const cardEl = getCardElement(item);
      cardsList.prepend(cardEl);
    });
    profileNameEl.textContent = me.name;
    profileDescriptionEl.textContent = me.about;
    profileAvatarImage.src = me.avatar;
  })
  .catch(console.error);

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
const profileAvatarBtn = document.querySelector(".profile__avatar-btn");
const profileAvatarImage = document.querySelector(".profile__avatar");

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const addCardFormEl = newPostModal.querySelector(".modal__form");

const newPostCaptionInput = addCardFormEl.querySelector("#caption-input");
const newPostLinkInput = addCardFormEl.querySelector("#image-link-input");

const cardSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const cardDeleteModal = document.querySelector("#delete-modal");
const cardDeleteCloseBtn = cardDeleteModal.querySelector(".modal__close-btn");
const cardCancelBtn = cardDeleteModal.querySelector(".modal__cancel-btn");
const cardDeleteSubmitBtn = cardDeleteModal.querySelector(".modal__submit-btn");
const cardDeleteForm = cardDeleteModal.querySelector("#delete-form")

const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarForm.querySelector("#profile-avatar-input");

const previewModal = document.querySelector("#preview-modal");
const previewCloseBtn = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function openModal(modal) {
  modal.classList.add(`modal_is-opened`);
  document.addEventListener(`keydown`, handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove(`modal_is-opened`);
  document.removeEventListener(`keydown`, handleEscapeKey);
}

function handleEscapeKey(evt) {
  if (evt.key === `Escape`) {
    const openModal = document.querySelector(`.modal_is-opened`);
    if (openModal) {
      closeModal(openModal);
    }
  }
}

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  closeModal(previewModal);
  closeModal(editProfileModal);
  closeModal(newPostModal);
});

let selectedCard, selectedCardId;

function handleDeleteSubmit(evt) {
   evt.preventDefault();
   api.deleteCardInfo(selectedCardId)
   .then((selectedCardId) => {
      selectedCardId.remove();
      cardDeleteForm.reset();
      closeModal(cardDeleteModal);
    })
    .catch(console.error);
}



function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(cardDeleteModal);



}

function handleLike(evt) {
  evt.target.classList.toggle("card_like-button_active");
}

function handleImageCard(data) {
  previewImageEl.src = data.link;
  previewImageEl.alt = data.name;
  previewCaptionEl.textContent = data.name;
  openModal(previewModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  cardLikeBtnEl.addEventListener("click", handleLike);

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", (evt) =>
     handleDeleteCard(cardElement, data.id));

cardImageEl.addEventListener("click", (evt) => handleImageCard(data));


  return cardElement;
}

editProfileBtn.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(
    editProfileFormEl,
    [editProfileNameInput, editProfileDescriptionInput],
    settings
  );
  openModal(editProfileModal);
});

previewCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

editProfileCloseBtn.addEventListener("click", () => {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", () => {
  openModal(newPostModal);
});

profileAvatarBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

newPostCloseBtn.addEventListener("click", () => {
  closeModal(newPostModal);
});

avatarCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

cardCancelBtn.addEventListener("click", () => {
  closeModal(cardDeleteModal);
});
cardDeleteCloseBtn.addEventListener("click", ( ) => {
  closeModal(cardDeleteModal)
});

cardDeleteSubmitBtn.addEventListener("click", () => {});

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      profileAvatarImage.src = data.avatar;
      avatarForm.reset();
      closeModal(avatarModal);
    })
    .catch(console.error);
}

avatarForm.addEventListener("submit", handleAvatarSubmit);
cardDeleteForm.addEventListener("submit", handleDeleteSubmit);

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      editProfileFormEl.reset();
      closeModal(editProfileModal);
    })
    .catch(console.error);
}

editProfileFormEl.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValue = {
    name: newPostCaptionInput.value,
    link: newPostLinkInput.value,
  };

  const cardEl = getCardElement(inputValue);
  cardsList.prepend(cardEl);
  evt.target.reset();
  disabledBtn(cardSubmitBtn, settings);
  closeModal(newPostModal);
}

function handleDeleteSubmit() {}

addCardFormEl.addEventListener("submit", handleAddCardSubmit);

enableValidation(settings);
