function PopupWithForm (props) {

    return (
        <div className={props.isOpen ? `popup popup-${props.name} popup_opened` : `popup popup-${props.name}`}>
            <div className="popup__page">
                <form className={`popup__container popup-${props.name}__container`} name={`popup-${props.name}`} noValidate>
                    <h2 className={`popup__title popup-${props.name}__title`}>{props.title}</h2>
                    {props.children}
                    <button className={`popup__button popup-${props.name}__button popup__button_valid`} type="submit">{props.buttonText}</button>
                    <button className={`popup__close popup-${props.name}__close`} type="button" onClick={props.onClose}></button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;
