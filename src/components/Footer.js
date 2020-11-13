import React from 'react';
import { Switch, Route } from 'react-router-dom';
function Footer() {
  return (
    <Switch>
      <Route path="/404" exact></Route>
      <Route path="*">
        <footer className="footer">
          <p className="footer__copyright">© 2020 Mesto Russia</p>
        </footer>
      </Route>
    </Switch>
  );
}
export default Footer;
