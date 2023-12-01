import './google.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useAuthContext } from '../hooks/useAuthContext';
import React, { useState, useEffect } from 'react';


const Rectangle = () => {
  return (
    <div className="rectangle"></div>
  );
}

const Google = () => {
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
    const [showContactModal, setShowContactModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
  
    const openModal = (modalName) => {
      if (modalName === 'showContactModal') {
        setShowContactModal(true);
      } else if (modalName === 'showLoginModal') {
        setShowLoginModal(true);
      }
    };
  
    const closeModal = (modalName) => {
      if (modalName === 'showContactModal') {
        setShowContactModal(false);
      } else if (modalName === 'showLoginModal') {
        setShowLoginModal(false);
      }
    };
  return (
    <div className="App">
      <main className="App-main">
        <div>
            <p className='login'>
              <h1>Login</h1>
              <button className="login-google-btn" onClick={handleButtonClick}>
                <span>Sign in with Google</span>
                <FontAwesomeIcon icon={faGoogle} className="google-icon" />
              </button>
              <button className="cancel">
                <span>Cancel</span>
              </button>
            </p>
        </div>
      </main>
    </div>
  );
}

export default Google;
