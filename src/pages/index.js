import "./index.css";

import {
  settings,
  enableValidation,
  resetValidation,
  disabledBtn,
} from "../scripts/validation.js";

import Api from "../utils/Api.js";
import { setButtonText } from "../utils/helpers.js";
import { modalOpenCloseBtn } from "../utils/helpers.js";

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
const cardDeleteForm = cardDeleteModal.querySelector("#delete-form");


const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
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
  closeModal(avatarModal);
  closeModal(cardDeleteModal);
});

let selectedCard, selectedCardId;

function handleDeleteSubmit(evt) {
   evt.preventDefault();
   const deleteBtn = evt.submitter;
   setButtonText(deleteBtn, true, "Delete", "Deleting ...")
   api.deleteCardInfo(selectedCardId)
   .then(() =>{
         selectedCard.remove();
      closeModal(cardDeleteModal);
   })
    .catch(console.error)
    .finally(()=> {
      setButtonText(deleteBtn, false, "Delete", "Deleting ...")
    });
}
cardDeleteForm.addEventListener("submit", handleDeleteSubmit);



function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(cardDeleteModal);
}

function handleLike(evt,selectedCardId) {
  evt.preventDefault();
  const likeBtn = evt.target;
  let isLiked= likeBtn.classList.contains("card__like-btn_active");
  api.handleLikes(isLiked, selectedCardId)
  .then((res) => {
    if (res.isLiked) {
      likeBtn.classList.add("card__like-btn_active");
    } else {
      likeBtn.classList.remove("card__like-btn_active");

    }
  })
  .catch((error) => {
    console.error("Failed to update like", error);
  });
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
  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-btn_active")
  }
  cardLikeBtnEl.addEventListener("click",(evt) =>
    handleLike(evt, data._id));
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", () =>
     handleDeleteCard(cardElement, data));

cardImageEl.addEventListener("click", () => handleImageCard(data));
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

modalOpenCloseBtn(previewCloseBtn, closeModal, previewModal);
modalOpenCloseBtn(editProfileCloseBtn, closeModal, editProfileModal);
modalOpenCloseBtn(newPostCloseBtn, closeModal, newPostModal);
modalOpenCloseBtn(avatarCloseBtn, closeModal, avatarModal);
modalOpenCloseBtn(cardCancelBtn, closeModal,cardDeleteModal);
modalOpenCloseBtn(cardDeleteCloseBtn, closeModal,cardDeleteModal);

modalOpenCloseBtn(newPostBtn,  openModal, newPostModal);
modalOpenCloseBtn(profileAvatarBtn, openModal, avatarModal);

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const avatarBtn = evt.submitter;
  setButtonText(avatarBtn,true);

  api
    .editAvatarInfo(avatarInput.value)

    .then((data) => {
      profileAvatarImage.src = data.avatar;
      avatarForm.reset();
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() =>{
      setButtonText(avatarBtn, false);
    });
}

avatarForm.addEventListener("submit", handleAvatarSubmit);

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const editSubmitBtn= evt.submitter;
  setButtonText(editSubmitBtn, true);

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
    .catch(console.error)
    .finally(() => {
      setButtonText(editSubmitBtn, false);
    });
}

editProfileFormEl.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const addCardBtn = evt.submitter;
  setButtonText( addCardBtn, true);

api.addCardInfo({
  name: newPostCaptionInput.value,
  link: newPostLinkInput.value,
})
.then((data) => {
  const cardEl = getCardElement(data);
  cardsList.prepend(cardEl);
  evt.target.reset();
  disabledBtn(cardSubmitBtn, settings);
  closeModal(newPostModal);
})
 .catch(console.error)
 .finally(() => {
      setButtonText(addCardBtn, false);
    });
}

addCardFormEl.addEventListener("submit", handleAddCardSubmit);

enableValidation(settings);
