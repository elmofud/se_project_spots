export function setButtonText(btn, isLoading, defaultText = "Save", loadingText = "Saving...")
{
  if (isLoading) {
    submitBtn.textContent = loadingText;

  } else {
    submitBtn.textContent = defaultText;
  }
}
