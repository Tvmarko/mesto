import { Popup } from "./Popup.js"

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__save-button');
        this._inputList = [...this._form.querySelectorAll('.popup__input')];
    }

    _getInputValues() {
        const inputValues = {};

        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
          });
          return inputValues;
    } 

    updateSubmitHandler(newSubmitHandler) {
        this._handleFormSubmit = newSubmitHandler 
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

      setInputValues(data) {
        this._inputList.forEach((input) => {
          // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
          input.value = data[input.name];
        });
      }

    close() {
        super.close();
        this._form.reset();
    }
}