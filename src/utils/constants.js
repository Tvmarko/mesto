export const popupOpenButtonEdit = document.querySelector('.profile__edit-button')
export const popupOpenButtonAdd = document.querySelector('.profile__add-button')
export const popupOpenButtonAvatar = document.querySelector('.profile__avatar-button')
export const formElementEdit = document.querySelector('.popup__form_edit')
export const formElementAdd = document.querySelector('.popup__form_add')
export const nameInput = document.querySelector('.popup__input_name')
export const jobInput = document.querySelector('.popup__input_about')
export const formAvatarEdit = document.querySelector('.popup__form_avatar')

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorMessageClass: 'popup__input-error_visible',
};

export const initialCards = [
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    }
  ]; 