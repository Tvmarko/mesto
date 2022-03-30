import { FormValidator } from "../components/FormValidator.js"; 
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";

import {
  popupOpenButtonEdit, 
  popupOpenButtonAdd, 
  formElementEdit, 
  formElementAdd, 
  nameInput, 
  jobInput, 
} from "../utils/constants.js";

import { validationConfig } from "../utils/constants.js";
import { initialCards } from "../utils/constants.js";

import './index.css';

// валидация форм
const editFormValidator = new FormValidator(validationConfig, formElementEdit);
const addFormValidator = new FormValidator(validationConfig, formElementAdd);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// открытие попапа редактирования
popupOpenButtonEdit.addEventListener('click', function () {
  popupProfileEdit.open();
  editFormValidator.resetErrors();
  const {name, job} = userNewInfo.getUserInfo();
  nameInput.value = name; 
  jobInput.value = job;
});

// открытие попапа добавления
popupOpenButtonAdd.addEventListener('click', function () {
  popupCardAdd.open();
  addFormValidator.toggleButtonState();
});

// сохранение в профайле данных, занесенных в форму
const handleEditFormSubmit = (data) => {
    const { name, profession } = data;    
    userNewInfo.setUserInfo(name, profession);
    popupProfileEdit.close();
}

// отображение массива карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    createNewCard(item);
  }
},
'.elements' 
); 

cardsList.renderItems();

// функция создания и добавления карточки
function createNewCard (item) {
  const card = new Card(item, '.elements-template', () => {popupPhoto.open(item.link, item.name)}).generateCard();
  cardsList.addItem(card);
}

// добавление карточки из формы
const handleCardFormSubmit = (data) => {
  const userCard = {
    name: data['place'], 
    link: data.link
    }
    createNewCard(userCard);
    popupCardAdd.close();
}

const popupPhoto = new PopupWithImage('.popup_image');
const popupProfileEdit = new PopupWithForm('.popup_edit', handleEditFormSubmit);
const popupCardAdd = new PopupWithForm('.popup_add', handleCardFormSubmit);
const userNewInfo = new UserInfo({profileNameSelector: '.profile__info-title', profileJobSelector: '.profile__info-subtitle'})

popupPhoto.setEventListeners();
popupProfileEdit.setEventListeners();
popupCardAdd.setEventListeners();
