import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    if (currentUser.name) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      closePopups={props.closePopups}
      onClose={props.onClose}
      title="Редактировать профиль"
      name="edit-profile"
    >
      <div className="popup__input">
        <input
          value={name}
          onChange={handleChangeName}
          type="text"
          id="popup__text-name"
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          name="name"
          className="popup__text popup__text_type_name"
          required
        />
        <span className="popup__text-error" id="popup__text-name-error"></span>
        <input
          onChange={handleChangeDescription}
          value={description}
          type="text"
          id="popup__text-about"
          minLength="2"
          maxLength="200"
          placeholder="О себе"
          name="about"
          className="popup__text popup__text_type_about"
          required
        />
        <span className="popup__text-error" id="popup__text-about-error"></span>
      </div>
      <button className="popup__save">Сохранить</button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
