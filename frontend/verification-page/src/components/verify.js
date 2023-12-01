import './google.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons'; // Import the camera icon
import { useAuthContext } from '../hooks/useAuthContext';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useLogout } from "../hooks/useLogout";



const Rectangle = () => {
  return (
    <div className="rectangle"></div>
  );
}

const Google = () => {
  
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
const { logout } = useLogout()
    const handleLogout = () => {
        logout()
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
    const getWebcam = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error('Error accessing the webcam', error);
      }
    };
  
    const handleCaptureOrReset = () => {
      if (capturedImage) {
        // Reset for a new capture
        setCapturedImage(null);
        getWebcam();
      } else {
        // Capture the image
        takePicture();
      }
    };
    const resetCapture = async () => {
      setCapturedImage(null);
      await getWebcam(); // Restart webcam
    };
    const takePicture = () => {
      if (stream && videoRef.current) {
        const videoElement = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        
        const imageSrc = canvas.toDataURL('image/png');
        setCapturedImage(imageSrc);
  
        // Optionally stop the webcam stream
        // stream.getTracks().forEach(track => track.stop());
        // setStream(null);
      }
    };
    useEffect(() => {
      getWebcam();
    }, []);
  
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
    const handleSubmit = () => {
      // Implement submission logic here
      console.log('Submit this image:', capturedImage);
      // You might want to navigate to another page after submission
      // navigate('/some-path');
    };
    return (
      <div className="App">
      <main className="App-main">
        <div className="video-box">
          <h1>Verify</h1>
          <div className="video-container">
            {!capturedImage && (
              <>
                <video ref={videoRef} autoPlay style={{ width: '100%', height: 'auto' }} />
                <button className="cancel" onClick={takePicture}>
                  <FontAwesomeIcon icon={faCamera} />
                </button>
              </>
            )}
            {capturedImage && (
              <div className="image-preview">
                <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%',
  maxHeight: '100%',
  width: 'auto',
  height: 'auto',
  objectFit: 'contain',
  objectPosition: 'center'}} />
                <button className="cancel" onClick={resetCapture}>
                  Retake Picture
                </button>
                <button className="cancel" onClick={handleSubmit}>
                  Submit
                </button>
                <button className="cancel" onClick={handleLogout}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
  
}

export default Google;
