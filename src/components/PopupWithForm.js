import { Popup } from "./Popup.js"

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__save-button');
    }

    _getInputValues() {
        const inputList = [...this._form.querySelectorAll('.popup__input')];
        const inputValues = {};

        inputList.forEach((input) => {
            inputValues[input.name] = input.value;
          });
          return inputValues;
    } 
    
    setButtonText(text) {
        this._submitButton.textContent = text
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