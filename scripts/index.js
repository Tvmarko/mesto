import { FormValidator } from "./FormValidator.js"; 
import { Card } from "./Card.js";

const popup = document.querySelector('.popup')
const popups = Array.from(document.querySelectorAll('.popup'));
const popupEdit = document.querySelector('.popup_edit')
const popupAdd = document.querySelector('.popup_add')
const popupOpenButtonEdit = document.querySelector('.profile__edit-button')
const popupOpenButtonAdd = document.querySelector('.profile__add-button')
const formElementEdit = popupEdit.querySelector('.popup__form_edit')
const formElementAdd = popupAdd.querySelector('.popup__form_add')
const profileName = document.querySelector('.profile__info-title')
const profileJob = document.querySelector('.profile__info-subtitle')
const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_about')
const cards = document.querySelector('.elements')
const placeInput = document.querySelector('.popup__input_place')
const imageInput = document.querySelector('.popup__input_image')

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorMessageClass: 'popup__input-error_visible',
};

const editFormValidator = new FormValidator(validationConfig, formElementEdit);
const addFormValidator = new FormValidator(validationConfig, formElementAdd);

// функция для открытия попапа
export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape); 
}

// открытие попапа редактирования
popupOpenButtonEdit.addEventListener('click', function () {
  openPopup(popupEdit); 
  editFormValidator.resetErrors();
  nameInput.value = profileName.textContent 
  jobInput.value = profileJob.textContent
});

// открытие попапа добавления
popupOpenButtonAdd.addEventListener('click', function () {
  openPopup(popupAdd);
  addFormValidator.toggleButtonState();
});

// функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEscape); 
};

// закрытие попапов по оверлею и крестику
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
   }
  })
})

// закрытие попапов по клавише esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened') 
    closePopup(openedPopup)
  }
}

// закрытие попапа редактирования и сохранение в профайле данных, занесенных в форму
function handleEditFormSubmit(evt) {
    evt.preventDefault() 
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    closePopup(popupEdit);
}

// слушатель для отслеживания события 'submit'
formElementEdit.addEventListener('submit', handleEditFormSubmit)

// валидация проверяемых форм
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// массив карточек
const initialCards = [
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

// функция создания экземпляра карточки
function createNewCard(item) {
  const card = new Card(item, '.elements-template').generateCard();
  cards.prepend(card);
}

// отображение массива карточек
initialCards.forEach((item) => {
  createNewCard(item);
});

//добавление новой карточки
function renderNewItem(item) {
  const newCard = {
    name: placeInput.value, 
    link: imageInput.value,
  }
  createNewCard(newCard);
}

// слушатель для отслеживания события 'submit'
formElementAdd.addEventListener('submit', function (evt) {
  evt.preventDefault()
  renderNewItem()
  closePopup(popupAdd)
  evt.target.reset()
})