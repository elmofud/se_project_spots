import { settings } from "../utils/constants.js";

export default class Validation {
  constructor(settings, formEl) {
    this._formselector = settings.FormSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formEl = formEl;
    this._settings = settings;
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._buttonEl = this._formEl.querySelector(this._submitButtonSelector);
  }

  showInputError = (inputEl, errorMsg) => {
    this._errorMsgEl = this.errorMsgFind(inputEl);
    this._errorMsgEl.textContent = errorMsg;
    inputEl.classList.add(this._inputErrorClass);
  };

  hideInputError = (inputEl) => {
    this._errorMsgEl = this.errorMsgFind(inputEl);
    this._errorMsgEl.textContent = "";
    inputEl.classList.remove(this._inputErrorClass);
  };

  errorMsgFind = (inputEl) => {
    const errorMsgElId = `#${inputEl.id}-error`;
    this._errorMsgEl = this._formEl.querySelector(errorMsgElId);
    return this._errorMsgEl;
  };

  _checkInputValidity = (inputEl) => {
    if (!inputEl.validity.valid) {
      this.showInputError(inputEl, inputEl.validationMessage);
    } else {
      this.hideInputError(inputEl);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._disabledBtn();
    } else {
      this._buttonEl.disabled = false;
      this._buttonEl.classList.remove(this._inactiveButtonClass);
    }
  };

  _disabledBtn = () => {
    this._buttonEl.disabled = true;
    this._buttonEl.classList.add(this._inactiveButtonClass);
  };

  resetValidation = () => {
    this._inputList.forEach((inputEl) => {
      this.hideInputError(inputEl);
    });
  };

  _setEventListeners = () => {
    this._toggleButtonState();

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
  const formList = this._form.querySelectorAll(this._formSelector);
  formList.forEach((formEl) => {
    this._setEventListeners(formEl);
  });
};

enableValidation(this._settings);

}