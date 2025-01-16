import React from "react";
import "./Modal.css";

function Modal({ show, onClose, children, height, width , className  }) {
  if (!show) {
    return null;
  }

  const modalClassName = className ? `${className}` : "modal-content";


  return (
    <div className="modal-overlay">
      <div className={modalClassName} style={{ width: width, height: height }}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
