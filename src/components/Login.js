import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as apiAuth from '../utils/apiAuth.js';
import InfoTooltip from './InfoTooltip';
import { errorMessages } from '../constants/errorMessages';

function Login(props) {
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
    if (!email || !password) {
      return;
    }
    apiAuth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          props.handleLogin(email);
          setEmail('');
          setPassword('');
          history.push('/');
        }
      })
      .catch((err) => {
        setStatus(false);
        setPopupOpen(true);
        setTimeout(() => {
          setPopupOpen(false);
        }, 3000);
      });
  }

  return (
    <div className="sign-up">
      <h2 className="sign-up__title">Вход</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="email"
          type="email"
          className="sign-up__input"
          placeholder="Email"
          value={email}
        ></input>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          className="sign-up__input"
          placeholder="Пароль"
          value={password}
        ></input>
        <button className="sign-up__button">Войти</button>
      </form>
      <InfoTooltip
        handlePopupOpen={handlePopupOpen}
        isOpen={popupOpen}
        errorText={errorMessages.general.fail}
        success={status}
      />
    </div>
  );
}

export default Login;
