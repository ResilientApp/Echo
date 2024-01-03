import React, {useEffect, useState, useRef} from 'react';
import './Ledger.css';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUber } from '@fortawesome/free-brands-svg-icons'; 




const Ledger = () =>{
  const [transactions, setTransactions] = useState([]);
  const [timesVerified, setTimesVerified] = useState(0);
  const [verifiedCompanies, setVerifiedCompanies] = useState(0);
  const [uploadDisabled, setUploadDisabled] = useState(false);

  
  const { user } = useAuthContext();

    const { logout } = useLogout()
    const handleLogout = () => {
        logout()
    };
    const handleProfileClick = () => {
        window.scrollTo(0, 0);
      };
      useEffect(() => {
        const pull = async () => {
          const response = await fetch("https://echo.resilientdb.com/retrieve", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              transactions: user.transactions
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log("Fetched data:", data);
            setTransactions(data); // Store the fetched transactions
    
            // Update timesVerified and verifiedCompanies
            setTimesVerified(data.length);
            const uniqueServices = new Set(data.map(item => item.asset.data.service));
            setVerifiedCompanies(uniqueServices.size);
          } else {
            console.error("Error fetching data:", response.statusText);
          }
        };
    
        pull();
      }, [user.transactions]); // Dependency array
      useEffect(() => {
        const checkUploadStatus = () => {
          const uploadDate = new Date(localStorage.getItem('lastUploadDate'));
          if (uploadDate) {
            const currentDate = new Date();
            const diffTime = Math.abs(currentDate - uploadDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays < 30) {
              setUploadDisabled(true);
            } else {
              setUploadDisabled(false);
            }
          }
        };
    
        checkUploadStatus();
      }, []);
      const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null); // Reference to the hidden file input

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = async () => {
    // If a file is selected, proceed to upload
    if (selectedFile) {
      if (!user._id) {
        console.error('User ID is missing');
        return;
      }
      console.log(user._id)

      const formData = new FormData();
      formData.append('file', selectedFile, user._id);
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_ADD}/upload`, {
          method: 'POST',
          body: formData,
        });

        // Reset the selected file
        
        if (response.ok) {
          const data = await response.json();
          console.log('File uploaded:', data);
    
          // Set lastUploadDate in localStorage
          localStorage.setItem('lastUploadDate', new Date().toISOString());
    
          // Disable the button for 30 days
          setUploadDisabled(true);
        }
        setSelectedFile(null);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
      
    } else {
      // If no file is selected, open the file selector
      fileInputRef.current.click();
    }
    
  };
      
  const buttonStyle = uploadDisabled ? { backgroundColor: 'grey' } : { backgroundColor: 'red' };

  return (
    <div className="App">
      <header className="App-header">
          <div className="logo"><span style={{color: "#82A5FF"}}>E</span>cho</div>
          <div className="header-buttons">
          <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={uploadDisabled}
        />
        <button
          className='login-button'
          onClick={handleUploadClick}
          disabled={uploadDisabled}
          style={buttonStyle}
        >
          {selectedFile ? 'Upload Verification' : 'Update Verification File'}
        </button>
          <button className='contact-button' onClick={handleProfileClick}>Profile</button>
            <button className='login-button' onClick={handleLogout}>Logout</button>
          </div>
      </header>
      <main className="App-main">
        <div className='profile'>
          <img src={user.picture} alt="profile picture" className='profile-picture'></img>
          <div>
          <h2>Hi, {user.name}</h2>
          <p>You verified <span style={{color:"rgba(130, 165, 255, 1)"}}>{timesVerified}</span> times for <span style={{color:"rgba(130, 165, 255, 1)"}}>{verifiedCompanies}</span> companies.</p>
          </div>
        </div>
        <div className='ledger'>
          <h4>My Verifications</h4>
          {transactions.map((transaction, index) => (
            <div className='verification' key={index}>
              <FontAwesomeIcon icon={faUber} className="icon" />
              <div className="verification-text">
                <p>
                  Platform: {transaction.asset.data.service}<space>    </space>
                  Time: {new Date(transaction.asset.data.start_time).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Ledger;
