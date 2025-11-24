import { handleResponse, _request } from "./helpers.js";

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return _request(`${this._baseUrl}/users/me`, {
      headers: this._headers
  });
}

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  getInitialCards() {
    return _request(`${this._baseUrl}/cards`, {
      headers: this._headers
    });
  }

  editUserInfo({ name, about }) {
    return _request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  deleteCardInfo(selectedCardId) {
    return _request(`${this._baseUrl}/cards/${selectedCardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  addCardInfo({name, link}) {
    return _request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),

    });
  }

   editAvatarInfo(avatar) {
    return _request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
  }

     handleLikes(isLiked, selectedCardId) {
    return _request(`${this._baseUrl}/cards/${selectedCardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    });
  }
}
