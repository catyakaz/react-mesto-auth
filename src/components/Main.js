import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-edit" onClick={props.onEditAvatar}>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            onClick={props.onEditProfile}
            className="profile__edit-button"
            type="button"
          ></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__add-button"
          type="button"
        ></button>
      </section>

      <section className="elements">
        {props.cards.map((card) => (
          <Card
            onCardDelete={props.onCardDelete}
            key={card._id}
            onCardLike={props.onCardLike}
            card={card}
            onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
