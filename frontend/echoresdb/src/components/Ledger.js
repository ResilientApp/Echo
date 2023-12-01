import React from 'react';
import './Ledger.css';
import { useLogout } from "../hooks/useLogout";


var photo_url = "/profile.jpg"
var user_name = "FirstName LastName"
var times_verified = 1
var verified_companies = 1

var verification_platform = "Uber"
var verification_time = "Thursday, 16-Nov-23 19:05:12 UTC"
var verification_platform2 = "Uber"
var verification_time2 = "Friday, 17-Nov-23 21:05:12 UTC"

const Ledger = () =>{
    const { logout } = useLogout()
    const handleLogout = () => {
        logout()
    };
    const handleProfileClick = () => {
        window.scrollTo(0, 0);
      };
  return (
    <div className="App">
      <header className="App-header">
          <div className="logo"><span style={{color: "#82A5FF"}}>E</span>cho</div>
          <div className="header-buttons">
          <button className='profile-button' onClick={handleProfileClick}>Profile</button>
            <button className='logout-button' onClick={handleLogout}>Logout</button>
          </div>
      </header>
      <main className="App-main">
        <div className='profile'>
          <img src={photo_url} alt="profile picture" className='profile-picture'></img>
          <div>
          <h2>Hi, {user_name}</h2>
          <p>You verified <span style={{color:"rgba(130, 165, 255, 1)"}}>{times_verified}</span> times for <span style={{color:"rgba(130, 165, 255, 1)"}}>{verified_companies}</span> companies.</p>
          </div>
        </div>
        <div className='ledger'>
          <h4>My Verifications</h4>
        </div>
        <div className='verification'>
          <div className='icon'>
            <img src={'/' + verification_platform + 'Icon.png'} style={{width:'90%',height:'90%',alignSelf:'center',margin:'auto'}}></img>
          </div>
          <p>
            Platform: {verification_platform}<br/>
            Time: {verification_time}
          </p>
        </div>
        <div className='verification'>
          <div className='icon'>
            <img src={'/' + verification_platform2 + 'Icon.png'} style={{width:'90%',height:'90%',alignSelf:'center',margin:'auto'}}></img>
          </div>
          <p>
            Platform: {verification_platform2}<br/>
            Time: {verification_time2}
          </p>
        </div>
        <div className='verification'>
          <div className='icon'>
            <img src={'/' + verification_platform2 + 'Icon.png'} style={{width:'90%',height:'90%',alignSelf:'center',margin:'auto'}}></img>
          </div>
          <p>
            Platform: {verification_platform2}<br/>
            Time: {verification_time2}
          </p>
        </div>
        <div className='verification'>
          <div className='icon'>
            <img src={'/' + verification_platform2 + 'Icon.png'} style={{width:'90%',height:'90%',alignSelf:'center',margin:'auto'}}></img>
          </div>
          <p>
            Platform: {verification_platform2}<br/>
            Time: {verification_time2}
          </p>
        </div>
      </main>
    </div>
  );
}

export default Ledger;
