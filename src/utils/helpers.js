

export function setButtonText(btn , isLoading, defaultText = "Save", loadingText = "Saving...")
{
  if (isLoading) {
    btn.textContent = loadingText;

  } else {
    btn.textContent = defaultText;
  }
}

export function modalOpenCloseBtn(btnEl, toggleModal, modalField)
{
  btnEl.addEventListener("click", () => {
  toggleModal(modalField);
});
}

export function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

 export function _request(url, options) {
  return fetch(url, options).then(handleResponse);
}