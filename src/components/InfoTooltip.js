import React from 'react';

function InfoTooltip({ isOpen, errorText, success, handlePopupOpen }) {
  return (
    <div className={`${isOpen ? 'popup_opened' : ''} popup`}>
      <div className="popup__container popup__container_type_error">
        <button
          className="popup__close popup__close-add"
          onClick={handlePopupOpen}
          type="button"
        ></button>
        <div
          className={`popup__icon popup__icon_type_${
            success ? 'success' : 'fail'
          }`}
        ></div>
        <p className="popup__error">{errorText}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
