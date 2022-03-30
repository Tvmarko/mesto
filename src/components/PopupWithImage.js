import { Popup } from "./Popup.js"

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }

	open(link, name) {
        const photo = this._popup.querySelector('.popup__photo');
        const photoCaption = this._popup.querySelector('.popup__photo-caption');

        photo.src = link
        photo.alt = name
        photoCaption.textContent = name
        super.open()
    }
}
    



    