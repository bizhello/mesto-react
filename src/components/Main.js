import {useEffect, useState} from "react";
import {api} from "../utils/Api";
import Card from "./Card";

function Main(props) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);
    // const [query, setQuery] = useState('');
    // const [currenQuery, setCurrentQuery] = useState('');

    const apiGetInitialCards = api.getInitialCards();
    const apiGetUserInfo = api.getUserInfo();

    useEffect(()=> {
        apiGetInitialCards
            .then(data => {
               setCards(data.map((item) => ({
                   src: item.link,
                   name: item.name,
                   likes: item.likes.length,
                   key: item.id
               })))
            })
            .catch(err => {
                console.log(err);
            });
        apiGetUserInfo
            .then(data => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
            })
            .catch(err => {
                console.log(err);
            });
},[]);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__box-avatar">
                    <div className="profile__change-avatar"></div>
                    <img alt="аватарка" className="profile__avatar" src={userAvatar} onClick={props.onEditAvatar}/>
                </div>

                <div className="profile__info">
                    <div className="profile__flex-row">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="profile__edit" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__status">{userDescription}</p>
                </div>
                <button className="profile__button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((card) => (<Card likes={card.likes} name={card.name} src={card.src} id={card.id} onClick={props.onCardClick} key={props.id}/>))}
            </section>
        </main>
    );
}

export default Main;
