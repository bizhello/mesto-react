function ImagePopup(props) {

    return (
        <div className={props.card ? `popup popup-fullscreen popup_opened` : `popup popup-fullscreen`}>
            <div className="popup-fullscreen__page">
                <img className="popup-fullscreen__image"
                     src={props.card}
                     alt='' />
                <p className="popup-fullscreen__title"></p>
                <button className="popup__close popup-fullscreen__close" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup;
