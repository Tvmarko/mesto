import { PopupWithForm } from "./PopupWithForm.js"

export class PopupWithConfirmation extends PopupWithForm {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector, handleFormSubmit);
    }

    updateSubmitHandler(newSubmitHandler) {
        this._handleFormSubmit = newSubmitHandler 
    }
}
    