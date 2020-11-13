import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import * as apiAuth from '../utils/apiAuth.js';
import { errorMessages } from '../constants/errorMessages';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const history = useHistory();

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  }

  function handlePopupOpen() {
    setPopupOpen(!popupOpen);
  }

  function handleSubmit(e) {
    e.preventDefault();
    apiAuth
      .register(password, email)
      .then(() => {
        setStatus(true);
        setTimeout(() => {
          history.push('/sign-in');
        }, 3000);
      })
      .catch((err) => {
        setStatus(false);
        setTimeout(() => {
          setPopupOpen(false);
        }, 3000);
        console.log(err);
      })
      .finally(() => setPopupOpen(true));
  }

  return (
    <div className="sign-up">
      <h2 className="sign-up__title">Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className="sign-up__input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
        ></input>
        <input
          onChange={handleChange}
          className="sign-up__input"
          type="password"
          name="password"
          placeholder="Пароль"
          value={password}
        ></input>
        <button type="submit" className="sign-up__button">
          Зарегистрироваться
        </button>
        <p className="sign-up__text">
          Уже зарегистрированы?
          <Link
            to="/sign-in"
            className="sign-up__link sign-up__link_type_footer"
          >
            Войти
          </Link>
        </p>
      </form>
      <InfoTooltip
        handlePopupOpen={handlePopupOpen}
        isOpen={popupOpen}
        errorText={
          status
            ? errorMessages.registration.success
            : errorMessages.general.fail
        }
        success={status}
      />
    </div>
  );
}

export default Register;
