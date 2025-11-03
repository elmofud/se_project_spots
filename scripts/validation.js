import {settings} from "../utils/constants.js";


export default class Validation {
  constructor(settings, formEl){
this._formselector = settings.FormSelector;
 this._inputSelector = settings.inputSelector;
  this._submitButtonSelector = settings.submitButtonSelector;
  this._inactiveButtonClass = settings.inactiveButtonClass;
  this._inputErrorClass = settings.inputErrorClass;
  this._errorClass = settings.errorClass;
  this._formEl = formEl;
  this._settings = settings;
  }


 showInputError = ( inputEl, errorMsg) => {
this._errorMsgEl = this.errorMsgFind(inputEl, errorMsg);
  this._errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(this._inputErrorClass);
};

 hideInputError = (inputEl) => {
  this._errorMsgEl = this.errorMsgFind(inputEl);
  this._errorMsgEl.textContent = "";
  inputEl.classList.remove(this._inputErrorClass);
};

 errorMsgFind =(inputEl) => {
const errorMsgElId = `#${inputEl.id}-error`;
  const errorMsgEl = this._formEl.querySelector(errorMsgElId);
  return errorMsgEl;
  }

_checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

_hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

_toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList)) {
    disabledBtn(buttonEl, config);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(config.inactiveButtonClass);
  }
};

disabledBtn = (buttonEl, config) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(config.inactiveButtonClass);
};

resetValidation = (formEl, inputList, config) => {
  inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl, config);
  });
};

_setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(this._inputSelector));
  const buttonEl = formEl.querySelector(this._submitButtonSelector);

  this._toggleButtonState(inputList, buttonEl, config);

  this._inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      this._checkInputValidity( inputEl);
      this._toggleButtonState();
    });
  });
};

enableValidation = (config) => {
  const formList = formEl.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

this._setEventListeners();

}