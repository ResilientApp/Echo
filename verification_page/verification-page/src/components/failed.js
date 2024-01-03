import './google.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'; // Import the times circle (X mark) icon
import { useAuthContext } from '../hooks/useAuthContext';
import React, { useState, useEffect } from 'react';
import { useLogout } from "../hooks/useLogout";



const Rectangle = () => {
  return (
    <div className="rectangle"></div>
  );
}

const Google = () => {
    const { logout } = useLogout()
    const handleLogout = () => {
        logout()
    };
    const { dispatch } = useAuthContext();
    const handleButtonClick = () => {
      window.location.href = `${process.env.REACT_APP_SERVER_ADD}/auth`;
    };
  useEffect(() => {
    const fetchUser = async () => {
      console.log("fetching user");


      const response = await fetch(`${process.env.REACT_APP_SERVER_ADD}/auth/googleUser`, {
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
                  <h1>Failed</h1>
                  <FontAwesomeIcon icon={faTimesCircle} style={{color: 'red', width: '30%',   height: '30%'}} />
                  <button className="cancel" onClick={handleLogout}>
                  Cancel
                </button>
                </p>
            </div>
          </main>
        </div>
      );
}

export default Google;
