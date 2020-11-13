import React from 'react';

function ImagePopup (props) {
    return (
        <div className={`popup popup-element ${props.card ? `popup_opened` : ``} ${props.onClose && 'popup_opened'}`}>
        <div className="popup-element__container">
            <button className="popup__close popup__close-element" onClick = {props.closePopups} type="button"></button>
            <img className="popup-element__image" alt='card' src={props.card ? props.card.link : ''}/>
    <p className="popup-element__name">{props.card ? props.card.name : ''}</p>
        </div>
    </div>
    )
}

export default ImagePopup;