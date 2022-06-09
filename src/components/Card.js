function Card(props) {

    function handleClick() {
        props.onClick(props.src);
    }

    return(
            <article className="element">
                <button className="element__trash" type="button"></button>
                <img className="element__photo"
                     src={props.src} alt="фото" onClick={handleClick} />
                <div className="element__under">
                    <h2 className="element__title">{props.name}</h2>
                    <div className="element__under-column">
                        <button className="element__like" type="button"></button>
                        <p className="element__number">{props.likes}</p>
                    </div>
                </div>
            </article>
    )
}
export default Card;
