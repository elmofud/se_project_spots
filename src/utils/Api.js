import { handleResponse } from "./helpers.js";

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(handleResponse);
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(handleResponse);
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(handleResponse);
  }

  deleteCardInfo(selectedCardId) {
    return fetch(`${this._baseUrl}/cards/${selectedCardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(handleResponse);
  }

  addCardInfo({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
   }).then(handleResponse);
  }

   editAvatarInfo(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(handleResponse);
  }

     handleLikes(isLiked, selectedCardId) {
    return fetch(`${this._baseUrl}/cards/${selectedCardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(handleResponse);
  }
}
