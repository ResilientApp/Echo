import React from 'react';
import './App.css';
import ContactModal from './components/ContactModal';
import LoginModal from './components/LoginModal';

class App extends React.Component {
  state = {
    showContactModal: false,
    showLoginModal: false
  };

  openModal = (modalName) => {
    this.setState({ [modalName]: true });
  };

  closeModal = (modalName) => {
    this.setState({ [modalName]: false });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="logo"><span style={{color: "#82A5FF"}}>E</span>cho</div>
          <div className="header-buttons">
            <button className = 'contact-button'onClick={() => this.openModal('showContactModal')}>Contact Us</button>
            <button className = 'login-button' onClick={() => this.openModal('showLoginModal')}>Login</button>
          </div>
        </header>
        <main>
          <section className="about-section">
            <h1><span className="highlighted-text">Empowering Contractor Verification</span> <br/> with Cutting-Edge Technology</h1>
            <p>Experience the seamless fusion of advanced facial recognition and robust blockchain technology, revolutionizing the way contractors are verified. Our solution offers unparalleled security and convenience, setting a new standard for digital identity authentication across platforms.</p>
          </section>
          <section className="verification-section">
          <div className="images-container">
              <img src="/frameuber.png" alt="Phone" className="phone-image"/>
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
        
        {this.state.showContactModal && <ContactModal close={() => this.closeModal('showContactModal')} />}
        {this.state.showLoginModal && <LoginModal close={() => this.closeModal('showLoginModal')} />}
      </div>
    );
  }
}

export default App;
