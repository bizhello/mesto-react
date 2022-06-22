import PopupWithForm from "./PopupWithForm";
import {useState} from "react";
import React from 'react';

export function EditAvatarPopup(props) {
    const [avatar, setAvatar] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(avatar);
        props.onClose();
    }
    function handleChangeAvatar(e) {
        setAvatar(e.target.value);
    }

    return(
        <PopupWithForm name={`edit-avatar`} title={`Обновить аватар`} isOpen={props.isOpen} onClose={props.onClose} buttonText='Cохранить' onSubmit={handleSubmit}>
            <div className="popup__input-container">
                <input className="popup__name popup-edit-avatar__src" id="popup-edit-avatar-src"
                       name="popup-edit-avatar-src" placeholder="Ссылка на картинку" type="url" required onChange={handleChangeAvatar}/>
                <span className="error" id="popup-edit-avatar-src-error"></span>
            </div>
        </PopupWithForm>
    )
}