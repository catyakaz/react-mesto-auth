import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found__title">Страница не найдена</h1>
      <Link to="/" className="not-found__link">
        Перейти на главную
      </Link>
    </div>
  );
}

export default NotFound;
