export class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes =  data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick.bind(this);
    this._handleDeleteClick = handleDeleteClick.bind(this);
    this._handleLikeClick = handleLikeClick.bind(this);
  }
  
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
        
      return cardElement;
  } 
    
  _setEventListeners() {
    this._elementLike = this._element.querySelector('.elements__element-like');
    this._elementPhoto = this._element.querySelector('.elements__element-photo');
    this._elementTitle =this._element.querySelector('.elements__element-title')

    this._elementLike.addEventListener('click', () => {
      this._handleLikeClick(this._id); 
    });
    
    this._element.querySelector('.elements__element-delete').addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });

    this._elementPhoto.addEventListener('click', () => {
      this._handleCardClick();
    });
  }
     
  _fillLike(){
    this._elementLike.classList.add('elements__element-like_active');
  }

  _removeLike(){
    this._elementLike.classList.remove('elements__element-like_active');
  }
  
  deleteElement(){
    this._element.remove();
    this._element = null;
  }

  isLiked() {
    const elementLikedByUser = this._likes.find(user => user._id === this._userId);
    return elementLikedByUser;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._elementLikeCount = this._element.querySelector('.elements__element-like-count');
    this._elementLikeCount.textContent = this._likes.length;

    if(this.isLiked()) {
      this._fillLike();
    } else {
      this._removeLike();
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    
    this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;
    this._elementTitle.textContent = this._name;
    
    this.setLikes(this._likes);

    if(this._ownerId !== this._userId) {
      this._element.querySelector('.elements__element-delete').style.display = 'none'
    }

    return this._element;
  }
}


   
    


  

  

  