import { Popup } from "./Popup.js"

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._photo = this._popup.querySelector('.popup__photo');
        this._photoCaption = this._popup.querySelector('.popup__photo-caption');
    }

	open(link, name) {
        this._photo.src = link
        this._photo.alt = name
        this._photoCaption.textContent = name
        super.open()
    }
}
    



    