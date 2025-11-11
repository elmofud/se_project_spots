export default class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "be27ae25-a70e-4b32-aa61-c5f0207b9ede",
      },
    }).then((res) => res.json());
  }

  // other methods for working with the API
}
