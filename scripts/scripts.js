const popup = document.querySelector('.popup')
const openPopupButton = document.querySelector('.profile__edit-button')
const closePopupButton = document.querySelector('.popup__close-button')
let formElement = document.querySelector('.popup__form')
let profileName = document.querySelector('.profile__info-title')
let profileJob = document.querySelector('.profile__info-subtitle')
let nameInput = document.getElementById('name')
let jobInput = document.getElementById('about')

// открыть попап
// занести данные в форму из профайла
function openPopup (event) {
    popup.classList.add('popup_opened')
    nameInput.value = profileName.textContent
    jobInput.value = profileJob.textContent
}

// закрыть попап
function closePopup() {
    popup.classList.remove('popup_opened')
}

// сохранить в профайле данные, занесенные в форму
// закрыть попап при наступлении события 'submit'
function formSubmitHandler(evt) {
    evt.preventDefault() 
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    popup.classList.remove('popup_opened')
}

// слушатели для открытия и закрытия попапа
openPopupButton.addEventListener('click', openPopup)
closePopupButton.addEventListener('click', closePopup)
// слушатель для отслеживания события 'submit'
formElement.addEventListener('submit', formSubmitHandler)
