/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './BecomeSeller.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './BecomeSellerAnimation.scss';
import Meta from "../../Meta";
const BecomeSeller = () => {
  const history = useHistory();
  // const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleButtonRegisterClick = (path, setLoading) => {
    setLoading(true);

    // Simulate a delay with setTimeout (e.g., 2 seconds)
    setTimeout(() => {
      setLoading(false);
      history.push({ pathname: path, state: { fromBecomeSeller: true } });
    }, 1500);
  };
  return (
    <>
      <Meta title="Become Seller" />
      {
        loading ? (
          <div className="become-seller-animation">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
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
                <button onClick={() => handleButtonRegisterClick('/register-seller', setLoadingRegister)} disabled={loadingRegister}>
                  {loadingRegister ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    'Register'
                  )}
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default BecomeSeller