/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './RegisterSeller.scss';

const RegisterSeller = () => {
  const history = useHistory();

  useEffect(() => {
    const isValidAccess = history.location.state && history.location.state.fromBecomeSeller;

    if (!isValidAccess) {
      // This will forcefully redirect to the become-seller page rather than giving direct access to the register-seller page
      history.replace('/become-seller');
    }
  }, [history]);

  return (
    <>
      <div className="register-seller-container">
        <h1>Register yourself as a seller</h1>
      </div>
    </>
  );
};

export default RegisterSeller;
