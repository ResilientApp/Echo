import React from 'react';
import './ContactModal.css'; // Ensure you have this CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ContactModal = ({ close }) => {
  // A function to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would handle the submission, e.g., sending an email
    close();
  };

  return (
    <div className="contact-modal">
      <div className="contact-modal-content">
        <button className="contact-modal-close" onClick={close}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <form onSubmit={handleSubmit} className="contact-form">
          <input type="email" id="email" name="email" placeholder='name@email.com' required />
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
