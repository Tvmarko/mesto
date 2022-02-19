const formSubmit = (evt) => {
  evt.preventDefault();
}

const checkInputValidity = ({inputErrorClass, errorMessageClass}, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      if (!inputElement.validity.valid) {
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(errorMessageClass);
      } else {
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorMessageClass);
        errorElement.textContent = '';
      };
    };

const toggleButtonState = ({inactiveButtonClass}, formElement, buttonFormSubmit) => {
      if (formElement.checkValidity()) {
      buttonFormSubmit.removeAttribute('disabled')
      buttonFormSubmit.classList.remove(inactiveButtonClass)
      } else {
        buttonFormSubmit.setAttribute('disabled', true)
        buttonFormSubmit.classList.add(inactiveButtonClass)
      };
  };

const enableValidation = ({formSelector, inputSelector, buttonSelector, currentPopupSelector, ...rest}) => {
  const currentPopup = document.querySelector(currentPopupSelector);
  const popupForm = currentPopup.querySelector(formSelector);
  const inputList = Array.from(currentPopup.querySelectorAll(inputSelector));
  const buttonFormSubmit = currentPopup.querySelector(buttonSelector);
  const formList = Array.from(document.querySelectorAll(formSelector));
  
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', formSubmit); 
});

  toggleButtonState(rest, popupForm, buttonFormSubmit);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(rest, currentPopup, inputElement);
      toggleButtonState(rest, popupForm, buttonFormSubmit);
  });
});
  evt.target.reset()
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__save-button',
  currentPopupSelector: '.popup_opened',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorMessageClass: 'popup__input-error_visible',
});


