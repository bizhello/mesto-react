import {CurrentUserContext} from "../contexts/CurrentUserContext";
import React from 'react';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__trash ${isOwn ? 'element__trash_visible' : 'element__trash_hidden'}`
    );
    const isLiked = props.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassNameActive = `element__like_active `;
    const cardLikeButtonClassName = `element__like `;

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }
    function handleClick() {
        props.onClick(props.link);
    }

    return(
            <article className="element" key={props.key}>
                <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick} key={props.key}></button>
                <img className="element__photo"
                     src={props.link} alt={props.name} onClick={handleClick} key={props.key}/>
                <div className="element__under">
                    <h2 className="element__title" key={props.key}>{props.name}</h2>
                    <div className="element__under-column">
                        <button className={isLiked ? cardLikeButtonClassNameActive : cardLikeButtonClassName}
                                type="button" onClick={handleLikeClick} key={props.key}></button>
                        <p className="element__number" key={props.key}>{props.likes.length}</p>
                    </div>
                </div>
            </article>
    )
}
export default Card;
