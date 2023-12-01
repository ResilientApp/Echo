import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../hooks/useAuthContext';
import './LoginModal.css'; // Assuming you have an external CSS file for styles

// Add any necessary imports here
// For example, if you're using a context or hooks for authentication

const LoginModal = ({ close }) => {
  // This function will handle the Google login process
  const { dispatch } = useAuthContext();

  const handleButtonClick = () => {
    window.location.href = "http://localhost:4000/auth";
  };

  useEffect(() => {
    const fetchUser = async () => {
      console.log("fetching user");


      const response = await fetch("http://localhost:4000/auth/googleUser", {
        credentials: 'include',
        mode: 'cors'
      });

      console.log("fetched user:");

  
      const json = await response.json();
      console.log(json);
  
      if (response.ok) {
        dispatch({ type: "LOGIN", payload: json })
      }
    };
  
    fetchUser();
  }, [dispatch]);
  return (
    <div className="login-modal">
      <div className="login-modal-content">
        <button className="login-modal-close" onClick={close}>
          <FontAwesomeIcon icon={faTimes} />
        </button>        
        <button className="login-google-btn" onClick={handleButtonClick}>
          <span>Sign in with Google</span>
          <FontAwesomeIcon icon={faGoogle} className="google-icon" />
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
