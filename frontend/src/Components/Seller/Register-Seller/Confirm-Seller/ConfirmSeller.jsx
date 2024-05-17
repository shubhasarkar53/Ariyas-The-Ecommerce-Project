/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux';
import './ConfirmSeller.scss';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ConfirmSeller = () => {
  const history = useHistory();
  // Retrieve form data from the Redux store
  const formData = useSelector((state) => state.registerSeller.formData);

  const handleSubmit = () => {
    history.push('/confirmation-page');
  };

  return (
    <>
      <div className="confirm-seller-container">
        <div className="confirm-container">

          <h2>Confirm Seller Details</h2>
          <div className="bar"></div>
          <div className="confirm-details">
            {Object.entries(formData).map(([key, value]) => (
              <p key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
              </p>
            ))}
          </div>
          <div className="update-details">
            <p>Update your details if necessary</p>
            <button>Update</button>
          </div>
          <div className="final-submit">
            <p>
              **By checking this box, I acknowledge that I have read, understood, and agree to abide by the
              <span style={{ textDecoration: 'underline', textDecorationColor: "coral" }}> <Link to="terms-conditions" className='terms'>Terms and Conditions</Link></span> and
              <span style={{ textDecoration: 'underline', textDecorationColor: "coral" }}> <Link to="/privacy-policy" className='privacy'>Privacy Policy</Link></span> of Ariyas,
              and I accept the services provided. The details provided by me are legitimate and I am responsible for any discrepancies.**
            </p>
            <label htmlFor="agreeCheckbox">
              <input type="checkbox" id="agreeCheckbox" />
              I agree to the terms and conditions
            </label>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmSeller