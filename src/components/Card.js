import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__trash ${isOwn ? 'element__trash-button_visible' : ''}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    // console.log(isLiked)
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (`element__like ${isLiked ? 'element__like_active' : ''}`);
    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }
 
    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }
    return (
        <div className="element">
            <img onClick={handleClick} alt='card_img' className="element__image" src={props.card.link} />
            <button className={cardDeleteButtonClassName} onClick = {handleDeleteClick} type="button"></button>
        <div className="element__group">
            <h2 className="element__name">{props.card.name}</h2>
            <div className="element__like-group">
                <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
                <div className="element__like-count">{props.card.likes.length}</div>
            </div>
        </div>
            </div >)
}

export default Card;