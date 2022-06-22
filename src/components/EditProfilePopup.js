import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import React from 'react';

export function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser(name, description);
        props.onClose();
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    return(
        <PopupWithForm name={`profile`} title={`Редактировать профиль`} isOpen={props.isOpen} onClose={props.onClose} buttonText='Cохранить' onSubmit={handleSubmit}>
            <label className="popup__input-container">
                <input className="popup__name popup-profile__name" id="popup-name"
                       name="popup-name" type="text" minLength="2"
                       maxLength="40" autoComplete="off" placeholder="Введите имя" required onChange={handleChangeName} value={name}/>
                <span className="error" id="popup-name-error"></span>
            </label>
            <label className="popup__input-container">
                <input className="popup__name popup-profile__name" id="popup-status" name="popup-status"
                       type="text" minLength="2" maxLength="200" autoComplete="off"
                       placeholder="Введите стасус" required onChange={handleChangeDescription} value={description}/>
                <span className="error" id="popup-status-error"></span>
            </label>
        </PopupWithForm>
    )
}