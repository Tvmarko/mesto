const popup = document.querySelector('.popup')
const closeOverlay = Array.from(document.querySelectorAll('.popup'));
const popupEdit = document.querySelector('.popup_edit')
const popupAdd = document.querySelector('.popup_add')
const popupOpenButtonEdit = document.querySelector('.profile__edit-button')
const popupOpenButtonAdd = document.querySelector('.profile__add-button')
const popupCloseButtonEdit = document.querySelector('.popup__close-button_edit')
const popupCloseButtonAdd = document.querySelector('.popup__close-button_add')
const popupClosePhotoButton = document.querySelector('.popup__close-button_photo')
const formElement = document.querySelector('.popup__form')
const formElementEdit = document.querySelector('.popup__form_edit')
const formElementAdd = document.querySelector('.popup__form_add')
const profileName = document.querySelector('.profile__info-title')
const profileJob = document.querySelector('.profile__info-subtitle')
const nameInput = document.getElementById('name')
const jobInput = document.getElementById('about')
const template = document.querySelector('.elements-template').content
const cards = document.querySelector('.elements')
const placeInput = document.getElementById('place')
const imageInput = document.getElementById('image')
const popupPhoto = document.querySelector('.popup_openImage')
const photo = document.querySelector('.popup__openphoto')
const photoCaption = document.querySelector('.popup__openphoto-caption')

// функция для открытия попапа
function openPopup (popup) {
  popup.classList.add('popup_opened')
  enableValidation();
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
});

// функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened')
};

// закрытие попапа редактирования
popupCloseButtonEdit.addEventListener('click', function () {
  closePopup(popupEdit); 
});

// закрытие попапа добавления
popupCloseButtonAdd.addEventListener('click', function () {
  closePopup(popupAdd); 
});

//закрытие попапа картинки
popupClosePhotoButton.addEventListener('click', function () {
  closePopup(popupPhoto); 
});

//закрытие всех попапов по оверлею и клавишей 
closeOverlay.forEach((popup) => {
popup.addEventListener('click', function(event) {
  if(event.target === event.currentTarget) {
      closePopup(popup)
  } 
})
document.addEventListener('keydown', function(event) {
  const key = event.key; 
  if(key === 'Escape') {
      closePopup(popup)
    } 
})
})

// сохранение в профайле данных, занесенных в форму
// закрытие попапа при отправке 'submit'
function handleFormSubmit(evt) {
    evt.preventDefault() 
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    closePopup(popupEdit); 
    if(formElement.checkValidity()) {
      evt.target.reset()
    }
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
    popupPhoto.classList.add('popup_opened')
    photo.src = event.target.src
    photo.alt = event.target.alt
    photoCaption.textContent = event.target.alt
  }

  

  