import Header from "./Header";
import Main from "./Main";
import Footer from './Footer'
import PopupWithForm from "./PopupWithForm";
import {useState, useEffect, } from "react";
import React from 'react';
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [addPlace, setAddPlace] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);
  const emptyArr = [];


  const handleEditAvatarClick = () => {
    setEditAvatar(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setAddPlace(true);
  }
  const handleCardClick = (src) => {
    setSelectedCard(src);
  }
  const closeAllPopups = () => {
    setEditAvatar(false);
    setIsEditProfilePopupOpen(false);
    setAddPlace(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(name, about) {
      api.editUserInfo(name, about)
          .then(()=> {
              setCurrentUser({
                  name: name,
                  about: about,
                  avatar: currentUser.avatar,
                  _id: currentUser._id,
                  cohort: currentUser.cohort
              })
          })
          .catch(err => {
              console.log(err);
          });
  }
  function handleUpdateAvatar(avatar) {
      api.changePhotoProfile(avatar)
          .then(()=>{
              setCurrentUser({
                  name: currentUser.name,
                  about: currentUser.about,
                  avatar: avatar,
                  _id: currentUser._id,
                  cohort: currentUser.cohort
              })
          })
          .catch(err => {
              console.log(err);
          });
    }
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => {
                console.log(err);
            });
    }
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(cards.filter(item => item !== card))
            })
            .catch(err => {
                console.log(err);
            });
    }
    function createCard(name, link) {
        api.createCard(name, link)
            .then(() => {
                setCards([{
                    link: link,
                    name: name,
                    card: undefined,
                    likes: emptyArr,
                    _id: undefined,
                    ownerId: currentUser
                }, ...cards]);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(()=> {
        const apiGetInitialCards = api.getInitialCards();
        const apiGetUserInfo = api.getUserInfo();
        Promise.all([apiGetInitialCards, apiGetUserInfo])
            .then(values => {
                setCurrentUser(values[1])
                setCards(values[0].map((item) => ({
                    card: item,
                    link: item.link,
                    name: item.name,
                    likes: item.likes,
                    _id: item._id,
                    ownerId: item.owner._id
                })))
            })
            .catch(err => {
                console.log(err);
            });

    },[]);

    return (
      <CurrentUserContext.Provider value={currentUser}>
      <div className="container">
        <div className="page">
          <Header />
          <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
                cards={cards} handleCardLike={handleCardLike} handleCardDelete={handleCardDelete}/>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={editAvatar} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup addPlace={addPlace} onClose={closeAllPopups} createCard={createCard}/>

          <PopupWithForm name={`delete-card`} title={`Вы уверены?`} onClose={closeAllPopups} buttonText='Да' />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;


