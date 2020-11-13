import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup (props) {

    const input = React.useRef();
    // const valueOfInput = input.current.value;
    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: input.current.value
        });
      }
    return (
        <PopupWithForm onSubmit = {handleSubmit} closePopups={props.closePopups} title='Обновить аватар' name='update-profile' isOpen={props.isOpen} onClose={props.onClose} >
        <div className="popup__input">
            <input ref = {input} type="url" id="popup__text-link" placeholder="Ссылка на картинку"
                name='link'
                className="popup__text popup-update__text-img popup__text_type_about" required />
            <span className='popup__text-error' id="popup__text-link-error"></span>
        </div>
        <button className="popup__save popup__update">
            Сохранить
    </button>
    </PopupWithForm>
    )
}

export default EditAvatarPopup;