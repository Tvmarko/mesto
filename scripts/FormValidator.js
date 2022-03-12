export class FormValidator {
    constructor(settings, form) {
        this._form = form
        this._settings = settings
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._form.querySelector(this._settings.buttonSelector);
    }

    _showInputError(inputElement) {
        const {inputErrorClass, errorMessageClass} = this._settings
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(errorMessageClass); 
    }

    _hideInputError(inputElement) {
        const {inputErrorClass, errorMessageClass} = this._settings
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorMessageClass);
        errorElement.textContent = '';
    }
  
  _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage)
        } else {
            this._hideInputError(inputElement)
      }
  }
  
  _disableButton() {
    const {inactiveButtonClass} = this._settings

    this._buttonElement.setAttribute('disabled', true)
    this._buttonElement.classList.add(inactiveButtonClass)
  }

  _anableButton() {
    const {inactiveButtonClass} = this._settings

    this._buttonElement.removeAttribute('disabled')
    this._buttonElement.classList.remove(inactiveButtonClass)
  }
  
  _toggleButtonState() {
    if (this._form.checkValidity()) {
      this._anableButton();
    } else {
      this._disableButton();
    }
  }
  
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

    this._setEventListeners();
  }

  resetErrors() {
    this._form.reset();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  } 
}   



  
  

 
  
  


