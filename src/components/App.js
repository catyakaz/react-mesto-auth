import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Register from './Register';
import Login from './Login';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import * as apiAuth from '../utils/apiAuth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './NotFound';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      apiAuth.getContent(token).then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);
  function handleLogin(email) {
    setEmail(email);
    setLoggedIn(true);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(undefined);
  }

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getInfo()])
      .then(([result, data]) => {
        setCards(result);
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleUpdateUser(user) {
    api
      .editInfo(user.name, user.about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(user) {
    api
      .updateAvatar(user.avatar)
      .then((data) => {
        setCurrentUser(data);
        console.log(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    console.log(card.name, card.link);
    api
      .createCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeCardLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((val) => val._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleExit() {
    localStorage.removeItem('token');
    setEmail('');
    setLoggedIn(false);
    history.push('sign-in');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} handleExit={handleExit} />
        {loading || (
          <Switch>
            <ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              onCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              exact
            ></ProtectedRoute>
            <Route path="/sign-up">
              <Register />
            </Route>
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} />
            </Route>
            <ProtectedRoute
              path="/404"
              exact
              loggedIn={loggedIn}
              component={NotFound}
            ></ProtectedRoute>
            <Route path="*">
              <Redirect to="/404" />
            </Route>
          </Switch>
        )}

        <Footer />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          closePopups={closeAllPopups}
          onClose={isEditProfilePopupOpen}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          closePopups={closeAllPopups}
          onClose={isEditAvatarPopupOpen}
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          closePopups={closeAllPopups}
          onClose={isAddPlacePopupOpen}
        />

        <PopupWithForm title="Вы уверены?" name="delete-photo">
          <button className="popup__save popup__delete">Да</button>
        </PopupWithForm>
        <ImagePopup
          closePopups={closeAllPopups}
          onClose={selectedCard}
          card={selectedCard}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
