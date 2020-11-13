import React from 'react';
import PopupWithForm from './PopupWithForm';
function AddPlacePopup(props) {

    const name = React.useRef();
    const link = React.useRef();

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({
          name: name.current.value,
          link: link.current.value
        });
      }

    return(
        <PopupWithForm onSubmit = {handleSubmit} closePopups={props.closePopups} title='Новое место' name='add-profile' isOpen={props.isOpen} onClose={props.onClose}>
        <div className="popup__input">
            <input ref = {name} type="text" minLength="1" maxLength="30" id="popup__text-title" placeholder="Название" name='title'
                className="popup__text popup__text-name popup__text_type_name" required />
            <span className='popup__text-error' id="popup__text-title-error"></span>
            <input ref = {link} type="url" id="popup__text-link" placeholder="Ссылка на картинку"
                name='link'
                className="popup__text popup__text-img popup__text_type_about" required />
            <span className='popup__text-error' id="popup__text-link-error"></span>
        </div>
        <button className="popup__save popup__add">
            Создать
        </button>
    </PopupWithForm>
    )
}

export default AddPlacePopup;