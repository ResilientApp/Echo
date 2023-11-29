import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Rectangle = () => {
  return (
    <div className="rectangle"></div>
  );
}

function App() {
  return (
    <div className="App">
      <main className="App-main">
        <div>
            <p className='login'>
              <h1>Login</h1>
              <button className="login-google-btn">
                <span>Sign in with Google</span>
                <FontAwesomeIcon icon={faGoogle} className="google-icon"/>
                {/* ADD GOOGLE VERIFICATION */}
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

export default App;
