import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import './LoginModal.css'; // Assuming you have an external CSS file for styles

const LoginModal = ({ close }) => {
  return (
    <div className="login-modal">
      <div className="login-modal-content">
        <button className="login-modal-close" onClick={close}>&times;</button>
        <button className="login-google-btn">
          <span>Sign in with Google</span>
          <FontAwesomeIcon icon={faGoogle} className="google-icon" />
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
