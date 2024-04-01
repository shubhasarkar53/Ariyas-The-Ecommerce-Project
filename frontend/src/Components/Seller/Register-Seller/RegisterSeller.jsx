/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './RegisterSeller.scss';
import profileSide from '../../../assets/Images/Icons/profile icons/pngwing 3.png'
import regSeller from '../../../assets/Images/Icons/profile icons/userImg.png'

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
        <div className="reg-img-mail-section">
          <div className="extra-container">
            <img src={regSeller} alt="" />
            <p>sayanizchad@gmail.com</p>
          </div>
        </div>

        <div className="seller-profile-form">
          <div className="pradeep-side">
            <img src={profileSide} alt="" />
          </div>
          <form action="" className="seller-form">
            <h2>Create Seller Profile</h2>
            <div className="shop-det-date">
              <div className="shop-name">
                <label htmlFor="">Shop/Agency name*</label>
                <input type="text" placeholder="" />
              </div>
              <div className="dob">
                <label htmlFor="">Date of Birth as per Aadhar card*</label>
                <input type="date" />
              </div>
            </div>
            <div className="form-reg-name">
              <div id="first-name">
                <label htmlFor="">First Name *</label>
                <input type="text" placeholder='' />
              </div>
              <div id="middle-name">
                <label htmlFor="">Middle Name</label>
                <input type="text" placeholder='' />
              </div>
              <div id="last-name">
                <label htmlFor="">Last Name *</label>
                <input type="text" placeholder='' />
              </div>
            </div>

          </form>
          <div className="pradeep-side">
            <img src={profileSide} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterSeller;
