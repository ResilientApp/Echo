import React, {useEffect, useState} from 'react';
import './Ledger.css';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUber } from '@fortawesome/free-brands-svg-icons'; 




const Ledger = () =>{
  const [transactions, setTransactions] = useState([]);
  const [timesVerified, setTimesVerified] = useState(0);
  const [verifiedCompanies, setVerifiedCompanies] = useState(0);
  
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
          const response = await fetch("http://localhost:5000/retrieve", {
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
    
    ;
  return (
    <div className="App">
      <header className="App-header">
          <div className="logo"><span style={{color: "#82A5FF"}}>E</span>cho</div>
          <div className="header-buttons">
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
