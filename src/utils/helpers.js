

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