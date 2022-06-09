export class Card {
    constructor(elementTitle, elementPhoto, template, handleCardClick, numberLikes, ownerId, likes, handleDeleteIconClick, handleLikeCard, profileId) {
        this._elementTitle = elementTitle;
        this._elementPhoto = elementPhoto;
        this._template = document.querySelector(template);
        this._handleCardClick = handleCardClick;
        this._numberLikes = numberLikes;
        this._ownerId = ownerId;
        this._likes = likes;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._handleLikeCard = handleLikeCard;
        this._profileId = profileId
    }

    removeElement() {
        this.view.remove();
        this.view = null;
    }

    _setListener = () => {
        this.view.querySelector('.element__like').addEventListener('click', this._handleLikeCard);
        this.view.querySelector('.element__trash').addEventListener('click',this._handleDeleteIconClick);
        this._cardImage.addEventListener('click', this._handleCardClick);
    }

    createCard = () => {
        this.view = this._template.content.cloneNode(true).querySelector('.element');
        this._cardImage = this.view.querySelector('.element__photo');
        this.view.querySelector('.element__title').textContent = this._elementTitle;
        this._cardImage.alt = this._elementTitle;
        this._cardImage.src = this._elementPhoto;
        this.view.querySelector('.element__number').textContent = this._numberLikes;
        this._setListener();
        if(this._likes !== undefined) {
            this._likes.forEach((item) => {
                if(item._id === this._profileId) {
                    this.view.querySelector('.element__like').classList.add('element__like_active');
                }
            })
        }
        if(this._profileId !== this._ownerId)
            {
                this.view.querySelector('.element__trash').style.display = 'none';
            }
        else
            {
                this.view.querySelector('.element__trash').style.display = 'block';
            }
        return this.view;
   }
    likeCard = () => {
        this.view.querySelector('.element__like').classList.toggle('element__like_active');
        this.view.querySelector('.element__number').textContent ++;
    }
    deleteLikeCard = () => {
        this.view.querySelector('.element__like').classList.toggle('element__like_active');
        this.view.querySelector('.element__number').textContent --;
    }
}

