import React from 'react';

function PopupWithForm(props) {
  return (
    <div
      className={`${props.isOpen ? 'popup_opened' : ''} ${
        props.onClose && 'popup_opened'
      } popup popup_type_${props.name}`}
    >
      <form onSubmit={props.onSubmit} className="popup__container" noValidate>
        <button
          className="popup__close popup__close-add"
          onClick={props.closePopups}
          type="button"
        ></button>
        <h3 className="popup__title">{props.title}</h3>
        {props.children}
      </form>
    </div>
  );
}

export default PopupWithForm;
