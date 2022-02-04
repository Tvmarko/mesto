const popupEdit = document.querySelector('.popup_edit')
const popupAdd = document.querySelector('.popup_add')
const openPopupButtonEdit = document.querySelector('.profile__edit-button')
const openPopupButtonAdd = document.querySelector('.profile__add-button')
const closePopupButtonEdit = document.querySelector('.popup__close-button_edit')
const closePopupButtonAdd = document.querySelector('.popup__close-button_add')
let formElement = document.querySelector('.popup__form')
let profileName = document.querySelector('.profile__info-title')
let profileJob = document.querySelector('.profile__info-subtitle')
let nameInput = document.getElementById('name')
let jobInput = document.getElementById('about')

// функция для открытия попапа
function openPopup (popup) {
  popup.classList.add('popup_opened')
}

// открываем попап редактирования
openPopupButtonEdit.addEventListener('click', function () {
  openPopup(popupEdit); 
  // заносим данные в форму из профайла
  nameInput.value = profileName.textContent 
  jobInput.value = profileJob.textContent
});

// открываем попап добавления
openPopupButtonAdd.addEventListener('click', function () {
  openPopup(popupAdd); 
});

// функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

// закрываем попап редактирования
closePopupButtonEdit.addEventListener('click', function () {
  closePopup(popupEdit); 
});

// закрываем попап добавления
closePopupButtonAdd.addEventListener('click', function () {
  closePopup(popupAdd); 
});

// сохранить в профайле данные, занесенные в форму
// закрыть попап при наступлении события 'submit'
function formSubmitHandler(evt) {
    evt.preventDefault() 
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    closePopup(popupEdit); 
}

// слушатель для отслеживания события 'submit'
formElement.addEventListener('submit', formSubmitHandler)

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
 
  const template = document.querySelector('.elements-template').content
  const cards = document.querySelector('.elements')
  const formElementAdd = document.querySelector('.popup__form_add')
  const placeInput = document.getElementById('place')
  const imageInput = document.getElementById('image')
   
  //создание карточки      
  function createItem(element) {
    const cardElement = template.querySelector('.elements__element').cloneNode(true)
    const cardElementImg = cardElement.querySelector('.elements__element-image')
    cardElement.querySelector('.elements__element-title').textContent = element.name
    cardElementImg.src = element.link
    cardElementImg.alt = element.name

    cardElement.querySelector('.elements__element-like').addEventListener('click', function (evt) { 
        evt.target.classList.toggle('elements__element-like_active')  
    })

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
    renderNewItem()
    closePopup(popupAdd)
  })

  