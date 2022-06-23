import PopupWithForm from "./PopupWithForm";
import {useState} from "react";

export function AddPlacePopup(props) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleChangeName(e){
        setName(e.target.value);
    }

    function handleChangeLink(e){
        setLink(e.target.value);
    }

    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        props.createCard(name, link);
        props.onClose();
    }

    return(
        <PopupWithForm name="add-element" title="Новое место" isOpen={props.addPlace} onClose={props.onClose} buttonText="Cохранить" onSubmit={handleAddPlaceSubmit}>
            <div className="popup__input-container">
                <input className="popup__name
                 popup-add-element__name"
                       id="popup-add-element-name"
                       name="popup-add-element-name"
                       placeholder="Название"
                       type="text"
                       minLength="2"
                       maxLength="30"
                       required
                       onChange={handleChangeName}/>
                <span className="error" id="popup-add-element-name-error"></span>
            </div>
            <div className="popup__input-container">
                <input className="popup__name popup-add-element__name"
                       id="popup-add-element-src"
                       name="popup-add-element-src"
                       placeholder="Ссылка на картинку"
                       type="url"
                       required
                       onChange={handleChangeLink}/>
                <span className="error" id="popup-add-element-src-error"></span>
            </div>
        </PopupWithForm>
    )
}