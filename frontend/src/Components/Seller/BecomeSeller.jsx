/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './BecomeSeller.scss';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const BecomeSeller = () => {
  const history = useHistory();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);

  const handleButtonClick = (path, setLoading) => {
    setLoading(true);

    // Simulate a delay with setTimeout (e.g., 2 seconds)
    setTimeout(() => {
      setLoading(false);
      history.push(path); // Navigate programmatically
    }, 1500);
  };
  return (
    <>
      <div className="become-seller-container">
        <div className="become-seller-card">
          <h2>Want to become a seller. Register now</h2>
          <div className="btn-auth-">
            {/*<button onClick={() => handleButtonClick('/login', setLoadingLogin)} disabled={loadingLogin}>
              {loadingLogin ? (
                <div className="loading-spinner"></div>
              ) : (
                'Login'
              )}
            </button> */}
            <button onClick={() => handleButtonClick('/register/new', setLoadingRegister)} disabled={loadingRegister}>
              {loadingRegister ? (
                <div className="loading-spinner"></div>
              ) : (
                'Register'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BecomeSeller