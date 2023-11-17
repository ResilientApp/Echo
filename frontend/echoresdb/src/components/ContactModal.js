import React from 'react';

const ContactModal = ({ close }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={close}>&times;</span>
        <p>Contact us content goes here...</p>
      </div>
    </div>
  );
};

export default ContactModal;
