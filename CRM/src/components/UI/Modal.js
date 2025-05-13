// src/components/UI/Modal.js
import React from "react";

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default Modal;
