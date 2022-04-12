import { FormValidator } from "../components/FormValidator.js"; 
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js";

import {
  popupOpenButtonEdit, 
  popupOpenButtonAdd,
  popupOpenButtonAvatar,
  formElementEdit, 
  formElementAdd, 
  formAvatarEdit,
  nameInput, 
  jobInput
  } from "../utils/constants.js";

import { validationConfig } from "../utils/constants.js";

import './index.css';

// валидация форм
const profileFormValidator = new FormValidator(validationConfig, formElementEdit);
const cardFormValidator = new FormValidator(validationConfig, formElementAdd);
const avatarFormValidator = new FormValidator(validationConfig, formAvatarEdit);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// открытие попапа редактирования
popupOpenButtonEdit.addEventListener('click', function () {
  const {name, job} = userNewInfo.getUserInfo();
  nameInput.value = name; 
  jobInput.value = job;
  profileFormValidator.toggleButtonState();
  profileFormValidator.resetErrors();
  popupProfileEdit.open();
});

// открытие попапа добавления
popupOpenButtonAdd.addEventListener('click', function () {
  cardFormValidator.toggleButtonState();
  cardFormValidator.resetErrors();
  popupCardAdd.open();
});

// открытие попапа для аватара
popupOpenButtonAvatar.addEventListener('click', function () {
  avatarFormValidator.toggleButtonState();
  avatarFormValidator.resetErrors();
  popupAvatar.open();
});

// созданиe карточки
const createNewCard = (item) => {
  const card = new Card(item, '.elements-template', () => {popupPhoto.open(item.link, item.name)},
    (id) => {
      popupConfirm.open();
      popupConfirm.updateSubmitHandler(() => {
        popupConfirm.setButtonText('Loading');
        api.deleteCard(id)
          .then(res => {
            card.deleteElement();
            popupConfirm.close();
          })
          .catch((err) => {
            console.log(err); 
          }) 
          .finally(() => {
            popupConfirm.setButtonText('Да');
          })
      })
    },
    (id) => {
      if(card.isLiked()) {
        api.deleteLike(id)
        .then(res => {
          card.setLikes(res.likes);
        })
        .catch((err) => {
          console.log(err); 
        }) 
      } else {
        api.addLike(id)
        .then(res => {
          card.setLikes(res.likes);
        })
        .catch((err) => {
          console.log(err); 
        }) 
      }
    }
  )
  return card.generateCard();
}

function renderCards (item) {
  const card = createNewCard(item);
  cardsList.addItem(card);
}
// отображение массива карточек
const cardsList = new Section({
  items: [],
  renderer: (item) => {
    renderCards(item);
  }
},
'.elements' 
); 

let userId
//загрузка информации с сервера
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([res, cardList]) => {
    userNewInfo.setUserInfo(res.name, res.about);
    userNewInfo.setUserAvatar(res.avatar);
    userId = res._id;

    cardList.forEach(data => {
      const card = createNewCard ({
        name: data.name, 
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
      })
        cardsList.addItem(card);
    })
  })
  .catch((err) => {
    console.log(err); 
  }); 
    
// сохранение в профайле данных, занесенных в форму
const handleEditFormSubmit = (data) => {
  popupProfileEdit.setButtonText('Loading');
    const { name, profession } = data; 
    api.editProfile(name, profession)
      .then(res => {
        userNewInfo.setUserInfo(name, profession);
        popupProfileEdit.close();
      })
      .catch((err) => {
        console.log(err); 
      }) 
      .finally(() => {
        popupProfileEdit.setButtonText('Сохранить');
      })
    }
    
// обновление аватара
const handleAvatarFormSubmit = (data) => {
  const {avatar} = data
  popupAvatar.setButtonText('Loading');
  api.editAvatar(avatar)
    .then(res => {
      userNewInfo.setUserAvatar(avatar);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err); 
    }) 
    .finally(() => {
      popupAvatar.setButtonText('Сохранить');
    })
  }
    
// добавление карточки из формы
const handleCardFormSubmit = (data) => {
  popupCardAdd.setButtonText('Loading');
  api.addCard(data['place'],data.link)
    .then(res => {
      renderCards ({
        name: res.name, 
        link: res.link,
        likes: res.likes,
        id: res._id,
        userId: userId,
        ownerId: res.owner._id
      })
      popupCardAdd.close();
    })
    .catch((err) => {
      console.log(err); 
    }) 
    .finally(() => {
      popupCardAdd.setButtonText('Сохранить');
    })
  }

const popupPhoto = new PopupWithImage('.popup_image');
const popupProfileEdit = new PopupWithForm('.popup_edit', handleEditFormSubmit);
const popupCardAdd = new PopupWithForm('.popup_add', handleCardFormSubmit);
const popupConfirm = new PopupWithConfirmation('.popup_confirm');
const popupAvatar = new PopupWithForm('.popup_avatar', handleAvatarFormSubmit);

const userNewInfo = new UserInfo({profileNameSelector: '.profile__info-title', profileJobSelector: '.profile__info-subtitle', profileAvatarSelector: '.profile__avatar'})

popupPhoto.setEventListeners();
popupProfileEdit.setEventListeners();
popupCardAdd.setEventListeners();
popupConfirm.setEventListeners();
popupAvatar.setEventListeners();
