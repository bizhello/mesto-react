import React from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__box-avatar">
                    <div className="profile__change-avatar"></div>
                    <img alt="аватарка" className="profile__avatar" src={currentUser.avatar} onClick={props.onEditAvatar}/>
                </div>
                <div className="profile__info">
                    <div className="profile__flex-row">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__status">{currentUser.about}</p>
                </div>
                <button className="profile__button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {props.cards.map((card) => (
                  <Card
                    card={card}
                    likes={card.likes}
                    name={card.name}
                    link={card.link}
                    id={card._id}
                    owner={card.ownerId}
                    onCardLike={props.handleCardLike}
                    onCardDelete={props.handleCardDelete}
                    onClick={props.onCardClick}
                    key={card._id}
                  />))}
            </section>
        </main>
    );
}

export default Main;
