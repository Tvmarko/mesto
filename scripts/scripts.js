const popup = document.querySelector('.popup')
const popups = Array.from(document.querySelectorAll('.popup'));
const popupEdit = document.querySelector('.popup_edit')
const popupAdd = document.querySelector('.popup_add')
const popupOpenButtonEdit = document.querySelector('.profile__edit-button')
const popupOpenButtonAdd = document.querySelector('.profile__add-button')
const newCardButtonAdd = document.querySelector('.popup__save-button_add')
const formElement = document.querySelector('.popup__form')
const formElementEdit = document.querySelector('.popup__form_edit')
const formElementAdd = document.querySelector('.popup__form_add')
const profileName = document.querySelector('.profile__info-title')
const profileJob = document.querySelector('.profile__info-subtitle')
const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_about')
const template = document.querySelector('.elements-template').content
const cards = document.querySelector('.elements')
const placeInput = document.querySelector('.popup__input_place')
const imageInput = document.querySelector('.popup__input_image')
const popupPhoto = document.querySelector('.popup_openimage')
const photo = document.querySelector('.popup__openphoto')
const photoCaption = document.querySelector('.popup__openphoto-caption')

// функция для открытия попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape); 
}

// открытие попапа редактирования
popupOpenButtonEdit.addEventListener('click', function () {
  openPopup(popupEdit); 
  // занесение данных в форму из профайла
  nameInput.value = profileName.textContent 
  jobInput.value = profileJob.textContent
});

// открытие попапа добавления
popupOpenButtonAdd.addEventListener('click', function () {
  openPopup(popupAdd);
  disableButtonAdd ();
});

// функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEscape); 
};

// закрытие попапов по оверлею и крестику
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
   }
    if (evt.target.classList.contains('popup__close-button')) {
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

// деактивация кнопки добавления
function disableButtonAdd () {
  newCardButtonAdd.setAttribute('disabled', true)
  newCardButtonAdd.classList.add('popup__save-button_inactive')
}

// сохранение в профайле данных, занесенных в форму
// закрытие попапа при отправке 'submit'
function handleFormSubmit(evt) {
    evt.preventDefault() 
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    closePopup(popupEdit);
    evt.target.reset()
  }

// слушатель для отслеживания события 'submit'
formElementEdit.addEventListener('submit', handleFormSubmit)

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
 
  //создание карточки      
  function createItem(element) {
    const cardElement = template.querySelector('.elements__element').cloneNode(true)
    const cardElementImg = cardElement.querySelector('.elements__element-photo')
    cardElement.querySelector('.elements__element-title').textContent = element.name
    cardElementImg.src = element.link
    cardElementImg.alt = element.name

    cardElement.querySelector('.elements__element-like').addEventListener('click', function (evt) { 
      evt.target.classList.toggle('elements__element-like_active')  
    })

    cardElement.querySelector('.elements__element-delete').addEventListener('click', function (evt) { 
      evt.target.closest('.elements__element').remove()
  })

    cardElementImg.addEventListener('click', openPopupImage)

    return cardElement
  }

  //отображение карточек
  function renderItem() {
    initialCards.forEach((element) => {cards.append(createItem(element))
    })
  }

  renderItem()

  //добавление новой карточки
  function renderNewItem(element) {
    const newCard = createItem(element = {name: placeInput.value, link: imageInput.value})
    cards.prepend(newCard)
  }
    
  // слушатель для отслеживания события 'submit'
  formElementAdd.addEventListener('submit', function (evt) {
    evt.preventDefault()
    renderNewItem()
    closePopup(popupAdd)
    evt.target.reset()
  })

  //открытие попапа картинки
  function openPopupImage(event) {
    openPopup(popupPhoto)
    photo.src = event.target.src
    photo.alt = event.target.alt
    photoCaption.textContent = event.target.alt
  }

  

  