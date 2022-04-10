import { Popup } from "./Popup.js"

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        const inputList = [...this._form.querySelectorAll('.popup__input')];
        const inputValues = {};

        inputList.forEach((input) => {
            inputValues[input.name] = input.value;
          });
          return inputValues;
    } 
    
    updateSubmitHandler(newSubmitHandler) {
        this._handleFormSubmit = newSubmitHandler 
    }

    setButtonText(text) {
        this._form.querySelector('.popup__save-button_confirm').textContent = text
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault()
          this._handleFormSubmit(this._getInputValues());
        });
      } 

    close() {
        super.close();
        this._form.reset();
    }
}