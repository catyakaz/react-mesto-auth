import React from 'react';
import Logo from '../../src/images/Vector.png';
import { Switch, Route, Link } from 'react-router-dom';

function Header({ email, handleExit }) {
  return (
    <Switch>
      <Route path="/404" exact></Route>
      <Route path="*">
        <header className="header">
          <div className="header__elements">
            <img src={Logo} className="header__logo" alt="Логотип" />
            <div className="header__user">
              <Switch>
                <Route path="/sign-in" />
                <Route path="/sign-up" />
                <Route path="*">
                  <div className="header__email">{email}</div>
                </Route>
              </Switch>
              <Switch>
                <Route path="/" exact>
                  <div
                    onClick={handleExit}
                    className="sign-up__link sign-up__link_type_header"
                  >
                    Выйти
                  </div>
                </Route>
                <Route path="/sign-up">
                  <Link
                    className="sign-up__link sign-up__link_type_header"
                    to="/sign-in"
                  >
                    Войти
                  </Link>
                </Route>
                <Route path="/sign-in">
                  <Link
                    className="sign-up__link sign-up__link_type_header"
                    to="sign-up"
                  >
                    Зарегистрироваться
                  </Link>
                </Route>
              </Switch>
            </div>
          </div>
          <div className="header__line"></div>
        </header>
      </Route>
    </Switch>
  );
}

export default Header;
