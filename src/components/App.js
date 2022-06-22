import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from './Footer'
import PopupWithForm from "./PopupWithForm";
import {useState, useEffect, } from "react";
import React from 'react';
import ImagePopup from "./ImagePopup";
import {api} from "../utils/Api";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup";




function App() {

  const [editProfile, setEditProfile] = useState(false);
  const [addPlace, setAddPlace] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState('');

  const fakeData = [{}];

  const handleEditAvatarClick = () => {
    setEditAvatar(true);
  }
  const handleEditProfileClick = () => {
    setEditProfile(true);
  }
  const handleAddPlaceClick = () => {
    setAddPlace(true);
  }
  const handleCardClick = (src) => {
    setSelectedCard(`${src}`);
  }
  const closeAllPopups = () => {
    setEditAvatar(false);
    setEditProfile(false);
    setAddPlace(false);
    setSelectedCard(null);
  }

  useEffect(()=> {
      api.getUserInfo()
          .then(data => {
              setCurrentUser(data)
          })
          .catch(err => {
              console.log(err);
          });
  },[]);

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

    const apiGetInitialCards = api.getInitialCards();
    const [cards, setCards] = useState([]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
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

    useEffect(()=> {
        apiGetInitialCards
            .then(data => {
                setCards(data.map((item) => ({
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

    function createCard(name, link) {
        api.createCard(name, link)
            .then(() => {
                setCards([{
                    link: link,
                    name: name,
                    card: undefined,
                    likes: [fakeData],
                    _id: undefined,
                    ownerId: undefined
                }, ...cards]);
            })
            .catch(err => {
                console.log(err);
            });
    }



    return (
      <CurrentUserContext.Provider value={currentUser}>
      <body className="container">
        <div className="page">
          <Header />
          <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
                cards={cards} handleCardLike={handleCardLike} handleCardDelete={handleCardDelete}/>
          <Footer />
          <EditProfilePopup isOpen={editProfile} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={editAvatar} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup addPlace={addPlace} onClose={closeAllPopups} createCard={createCard}/>

          <PopupWithForm name={`delete-card`} title={`Вы уверены?`} onClose={closeAllPopups} buttonText='Да' />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </body>
      </CurrentUserContext.Provider>
  );
}

export default App;


