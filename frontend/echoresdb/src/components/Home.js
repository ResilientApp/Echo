import React, { useState, useEffect } from 'react';
import './Home.css';
import ContactModal from './ContactModal';
import LoginModal from './LoginModal';
import { useAuthContext } from '../hooks/useAuthContext';



const Home = () => {
  const { dispatch } = useAuthContext();
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
        
      <div>
        <main>
        <section className="App-header1">
          <div className="logo"><span style={{color: "#82A5FF"}}>E</span>cho</div>
          <div className="header-buttons">
            <button className = 'contact-button'onClick={() => openModal('showContactModal')}>Contact Us</button>
            <button className = 'login-button' onClick={() => openModal('showLoginModal')}>Login</button>
          </div>
        </section>
          <section className="about-section">
            <h1><span className="highlighted-text">Empowering Contractor Verification</span> <br/> with Cutting-Edge Technology</h1>
            <p>Experience the seamless fusion of advanced facial recognition and robust blockchain technology, revolutionizing the way contractors are verified. Our solution offers unparalleled security and convenience, setting a new standard for digital identity authentication across platforms.</p>
          </section>
          <section className="verification-section">
          <div className="images-container">
              <img src="/Frameuber.png" alt="Phone" className="phone-image"/>
              <img src="/ledger.png" alt="Recent Verification" className="recent-verification-image"/>
            </div>
          </section>

          {/* Further sections based on the image... */}
          <section className="our-project-section">
            <h2><span style={{color: "#82A5FF"}}>About </span>Our Project</h2>
            <h3>Visionary Integration of Facial Recognition and Blockchain Technology:</h3> <p>We envisage a future where the verification of contractors is as reliable as it is effortless. Our project introduces a groundbreaking platform that stands at the intersection of advanced machine learning algorithms for facial recognition and the immutable security of blockchain technology. Our goal is to create a verification ecosystem that is not only efficient and accurate but also fosters trust and mobility across various service platforms.</p>
            <h3>Solving The Identity Puzzle in the Gig Economy:</h3> <p>The gig economy thrives on flexibility and swift turnovers, yet the current systems for contractor verification are fragmented, slow, and often insecure, posing a substantial barrier to entry for many potential contractors. Our solution addresses these issues head-on by offering a streamlined, secure, and user-friendly verification process that empowers contractors and platforms alike.</p>
            <h3>Harnessing Technology for Trust </h3> <p> We leverage the most sophisticated machine learning algorithms to ensure that facial recognition is not just accurate but also fair and inclusive. By minting verified identities on the resilient blockchain, we create a verifiable and non-forgeable history for each contractor. This not only elevates the trust quotient for platforms but also enhances the mobility for contractors, allowing them to transit seamlessly between services, carrying their verified identities with them.</p>
          </section>

          <section className="our-team-section">
            <h2>Our Team</h2>
            <div className="team-members">
              {/* Placeholder for team members */}
              <div className="team-member">
                <div className="member-photo"></div>
                <a href="team-member-link" className="member-name">Name</a> {/* Replace 'team-member-link' with actual URL */}
              </div>
              <div className="team-member">
                <div className="member-photo"></div>
                <a href="team-member-link" className="member-name">Name</a> {/* Replace 'team-member-link' with actual URL */}
              </div>
              <div className="team-member">
                <div className="member-photo"></div>
                <a href="team-member-link" className="member-name">Name</a> {/* Replace 'team-member-link' with actual URL */}
              </div>
              <div className="team-member">
                <div className="member-photo"></div>
                <a href="team-member-link" className="member-name">Name</a> {/* Replace 'team-member-link' with actual URL */}
              </div>
            </div>
          </section>


          
        </main>
        
        {showContactModal && <ContactModal close={() => closeModal('showContactModal')} />}
        {showLoginModal && <LoginModal close={() => closeModal('showLoginModal')} />}
      </div>
    );
  }

export default Home;
