export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick.bind(this);
  }
  
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
        
      return cardElement;
  } 
    
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    
    this._element.querySelector('.elements__element-photo').src = this._link;
    this._element.querySelector('.elements__element-photo').alt = this._name;
    this._element.querySelector('.elements__element-title').textContent = this._name;
    
    return this._element;
  }

  _setEventListeners() {
    this._elementLike = this._element.querySelector('.elements__element-like');

    this._elementLike.addEventListener('click', () => {
      this._toggleLike() 
    });
    
    this._element.querySelector('.elements__element-delete').addEventListener('click', () => {
      this._deleteElement()
    });

    this._element.querySelector('.elements__element-photo').addEventListener('click', () => {
      this._handleCardClick();
    });
  }
     
  _toggleLike(){
    this._elementLike.classList.toggle('elements__element-like_active');
  }
      
  _deleteElement(){
    this._element.remove();
    this._element = null;
  }
}


   
    


  

  

  