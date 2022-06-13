import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from './Footer'
import PopupWithForm from "./PopupWithForm";
import {useState} from "react";
import ImagePopup from "./ImagePopup";


function App() {

  const [editProfile, setEditProfile] = useState(false);
  const [addPlace, setAddPlace] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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

  return (
      <body className="container">
        <div className="page">
          <Header />
          <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
          <Footer />

          <PopupWithForm name={`profile`} title={`Редактировать профиль`} isOpen={editProfile} onClose={closeAllPopups} buttonText='Cохранить'>
                  <label className="popup__input-container">
                    <input className="popup__name popup-profile__name" id="popup-name"
                           name="popup-name" type="text" minLength="2"
                           maxLength="40" autoComplete="off" placeholder="Введите имя" required />
                    <span className="error" id="popup-name-error"></span>
                  </label>
                  <label className="popup__input-container">
                    <input className="popup__name popup-profile__name" id="popup-status" name="popup-status"
                           type="text" minLength="2" maxLength="200" autoComplete="off"
                           placeholder="Введите стасус" required />
                    <span className="error" id="popup-status-error"></span>
                  </label>
          </PopupWithForm>

          <PopupWithForm name={`add-element`} title={`Новое место`} isOpen={addPlace} onClose={closeAllPopups} buttonText='Cохранить' >
                  <div className="popup__input-container">
                    <input className="popup__name popup-add-element__name" id="popup-add-element-name"
                           name="popup-add-element-name" placeholder="Название" type="text" minLength="2" maxLength="30"
                           required />
                    <span className="error" id="popup-add-element-name-error"></span>
                  </div>
                  <div className="popup__input-container">
                    <input className="popup__name popup-add-element__name" id="popup-add-element-src"
                           name="popup-add-element-src" placeholder="Ссылка на картинку" type="url" required />
                    <span className="error" id="popup-add-element-src-error"></span>
                  </div>
          </PopupWithForm>

          <PopupWithForm name={`edit-avatar`} title={`Обновить аватар`} isOpen={editAvatar} onClose={closeAllPopups} buttonText='Cохранить' >
              <div className="popup__input-container">
                <input className="popup__name popup-edit-avatar__src" id="popup-edit-avatar-src"
                       name="popup-edit-avatar-src" placeholder="Ссылка на картинку" type="url" required />
                <span className="error" id="popup-edit-avatar-src-error"></span>
              </div>
          </PopupWithForm>
          <PopupWithForm name={`delete-card`} title={`Вы уверены?`} onClose={closeAllPopups} buttonText='Да' />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </body>
  );
}

export default App;


