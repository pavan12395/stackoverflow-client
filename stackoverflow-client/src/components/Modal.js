import React from 'react';

const Modal = ({ isOpen, message, onClose,displayClose}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        {
        displayClose && <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        }
        <div className="modal-content">
          <h1>{message}</h1>
        </div>
      </div>
    </div>
  );
};

export default Modal;
