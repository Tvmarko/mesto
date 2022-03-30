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
const profileFormValidator = new FormValidator(validationConfig, formElementEdit);
const cardFormValidator = new FormValidator(validationConfig, formElementAdd);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// открытие попапа редактирования
popupOpenButtonEdit.addEventListener('click', function () {
  const {name, job} = userNewInfo.getUserInfo();
  nameInput.value = name; 
  jobInput.value = job;
  popupProfileEdit.open();
});

// открытие попапа добавления
popupOpenButtonAdd.addEventListener('click', function () {
  cardFormValidator.toggleButtonState();
  cardFormValidator.resetErrors();
  popupCardAdd.open();
});

// сохранение в профайле данных, занесенных в форму
const handleEditFormSubmit = (data) => {
    const { name, profession } = data;    
    userNewInfo.setUserInfo(name, profession);
    popupProfileEdit.close();
}

// созданиe карточки
const createNewCard = (item) => {
  const card = new Card(item, '.elements-template', () => {popupPhoto.open(item.link, item.name)});
  return card.generateCard();
}

// отображение массива карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createNewCard(item);
    cardsList.addItem(card);
  }
},
'.elements' 
); 

cardsList.renderItems();

// добавление карточки из формы
const handleCardFormSubmit = (data) => {
  const card = createNewCard ({
    name: data['place'], 
    link: data.link
    })
    cardsList.addItem(card);
    popupCardAdd.close();
}

const popupPhoto = new PopupWithImage('.popup_image');
const popupProfileEdit = new PopupWithForm('.popup_edit', handleEditFormSubmit);
const popupCardAdd = new PopupWithForm('.popup_add', handleCardFormSubmit);
const userNewInfo = new UserInfo({profileNameSelector: '.profile__info-title', profileJobSelector: '.profile__info-subtitle'})

popupPhoto.setEventListeners();
popupProfileEdit.setEventListeners();
popupCardAdd.setEventListeners();
