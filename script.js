const popup = document.querySelector('.popup')
const OpenPopupButton = document.querySelector('.profile__edit-button')
const ClosePopupButton = document.querySelector('.popup__close-button')

function openPopup (event) {
    popup.classList.add('popup_opened')
}

function closePopup() {
    popup.classList.remove('popup_opened')
}

OpenPopupButton.addEventListener('click', openPopup)
ClosePopupButton.addEventListener('click', closePopup)

popup.addEventListener('click', function(event) {
    if(event.target === event.currentTarget) {
        closePopup()
    }
})

let PopupSaveClose = document.querySelector('.popup__save-button')
let FormElement = document.querySelector('.popup__container')
let ProfileName = document.querySelector('.profile__info_title')
let ProfileJob = document.querySelector('.profile__info_subtitle')
let NameInput = document.getElementById('name')
let JobInput = document.getElementById('about')

function formSubmitHandler(evt) {
    evt.preventDefault() 
    ProfileName.textContent = NameInput.value
    ProfileJob.textContent = JobInput.value
}

PopupSaveClose.addEventListener('click', closePopup)
FormElement.addEventListener('submit', formSubmitHandler)
