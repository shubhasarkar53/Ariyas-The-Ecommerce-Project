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

            <div className="form-phone">
              <label>Phone number *</label>
              <div className="phone-section">
                <div className="phone-sect-1">
                  <div className="input-dropdown">
                    <div className="dropdown">
                      <select className="dropdown-options">
                        <option href="#">+91</option>
                        <option href="#">+1</option>
                        {/* Add other country codes as needed */}
                      </select>
                    </div>
                  </div>
                  <input type="tel" />
                  <button>Send OTP</button>
                </div>
                <div className="phone-sect-2">
                  <input type="number" className="phone-input" />
                  <div className="btn-verify">
                    <button>Verify</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-email">
              <label>Email ID *</label>
              <div className="email-section">
                <div className="email-sect-1">
                  <input type="email" />
                  <button>Send OTP</button>
                </div>
                <div className="email-sect-2">
                  <input type="number" />
                  <button>Verify</button>
                </div>
              </div>
            </div>

            <div className="form-aadhar">
              <div className="aadhar-section">
                <div className="aadhar-sect-1">
                  <label>Enter your Aadhar number *</label>
                  <input type="text" />
                </div>
                <div className="aadhar-sect-2">
                  <label>Upload both side picture of Aadhar Card *</label>
                  <button>Upload</button>
                </div>
              </div>
            </div>

            <div className="form-pan">
              <div className="pan-section">
                <div className="pan-sect-1">
                  <label>Enter your PAN Number *</label>
                  <input type="text" />
                </div>
                <div className="pan-sect-2">
                  <label>Upload both side picture of PAN Card *</label>
                  <div className="input-pan">
                    <button>Upload</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-commercial-address">
              <label>Enter your Commercial Address *</label>
              <div className="commercial-section">
                <div className="comm-sect-1">
                  <label>Pincode</label>
                  <input type="number" />
                </div>
                <div className="comm-sect-2">
                  <label>Post Office</label>
                  <input type="text" />
                </div>
                <div className="comm-sect-3">
                  <label>Police Station</label>
                  <input type="text" />
                </div>
              </div>
              <div className="address-section">
                <div className="address-sect-1">
                  <label>Flat, House no, Building, Company, Apartment</label>
                  <input type="text" />
                </div>
                <div className="address-sect-2">
                  <label>Area, Street, Sector, Village</label>
                  <input type="text" />
                </div>
                <div className="address-sect-3">
                  <label>Landmark</label>
                  <input type="text" />
                </div>
                <div className="address-sect-4">
                  <div className="location-details">
                    <label>Town/City</label>
                    <input type="text" />
                  </div>
                  <div className="choose-state">
                    <label>Choose a State</label>
                    <select name="state">
                      <option value="Choose a State">-Select a State-</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>

                  </div>
                </div>

                <div className="address-sect-5">
                  <label>Address proof of business place from where the products will be shipped *</label>
                  <button>Upload</button>
                </div>
              </div>
            </div>

            <div className="form-upload-account-details">
              <p>A copy of your current accounts cancelled cheque showing bank account number and account type with the account holders name and IFSC code *</p>
              <div className="btn-account-upload">
                <button>Upload</button>
              </div>
            </div>

            <div className="form-gst">
              <label>GST Certificate *</label>
              <button>Upload</button>
            </div>

            <div className="btn-submit-div">
              <button className="submit-btn">
                Submit
              </button>

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
