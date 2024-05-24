/* eslint-disable no-unused-vars */

import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './RegisterSeller.scss';
import profileSide from '../../../assets/Images/Icons/profile icons/pngwing 3.png'
import regSeller from '../../../assets/Images/Icons/profile icons/userImg.png'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../../Redux/Actions/registerSellerAction';
import { submitFormData, uploadDocumentSuccess } from '../../../Redux/Actions/registerSellerAction';
import './RegisterSellerResponse.scss';
import axios from 'axios';
import { sendFormSubmissionEmailToAuth } from '../../../../../backend/apii';


const RegisterSeller = () => {
  const history = useHistory();
  const { user, loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();


  // State variables for form data
  const [formData, setFormData] = useState({
    shopName: '',
    dob: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    aadhar: '',
    pan: '',
    pinCode: '',
    postOffice: '',
    policeStation: '',
    houseDet: '',
    houseAddress: '',
    townAdd: '',
    state: 'West Bengal'
  });

  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // useEffect(() => {
  //   const isValidAccess = history.location.state && history.location.state.fromBecomeSeller;

  //   if (!isValidAccess) {
  //     // This will forcefully redirect to the become-seller page rather than giving direct access to the register-seller page
  //     history.replace('/become-seller');
  //   }
  // }, [history]);

  const [shopName, setShopName] = useState('');
  const [dob, setDob] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [verifyPhone, setVerifyPhone] = useState('');
  const [email, setEmail] = useState('');
  const [verifyEmail, setVerifyEmail] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [pan, setPan] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [postOffice, setPostOffice] = useState('');
  const [policeStation, setPoliceStation] = useState('');
  const [houseDet, setHouseDet] = useState('');
  const [houseAddress, setHouseAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [townAdd, setTownAdd] = useState('');

  const validateFields = () => {
    const requiredFields = [
      { field: formData.shopName, errorMessage: 'Shop/Agency name is required' },
      { field: formData.dob, errorMessage: 'Date of Birth is required' },
      { field: formData.firstName, errorMessage: 'First Name is required' },
      { field: formData.lastName, errorMessage: 'Last Name is required' },
      { field: formData.phone, errorMessage: 'Phone number is required' },
      { field: formData.email, errorMessage: 'Email ID is required' },
      { field: formData.aadhar, errorMessage: 'Aadhar number is required' },
      { field: formData.pan, errorMessage: 'PAN number is required' },
      { field: formData.pinCode, errorMessage: 'Pincode is required' },
      { field: formData.postOffice, errorMessage: 'Post Office is required' },
      { field: formData.policeStation, errorMessage: 'Police Station is required' },
      { field: formData.houseDet, errorMessage: 'House details are required' },
      { field: formData.houseAddress, errorMessage: 'House address is required' },
      { field: formData.townAdd, errorMessage: 'Town/City is required' },
    ];

    let isValid = true;

    requiredFields.forEach(({ field, errorMessage }) => {
      if (!field) {
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        isValid = false;
      }
    });

    return isValid;
  };

  const handleUpload = (type, event) => {
    event.preventDefault();
    // Open file input dialog
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        let message = '';
        switch (type) {
          case 'aadhar':
            message = 'Aadhar card uploaded successfully';
            break;
          case 'pan':
            message = 'PAN card uploaded successfully';
            break;
          case 'addressProof':
            message = 'Address proof uploaded successfully';
            break;
          case 'accountDetails':
            message = 'Account details uploaded successfully';
            break;
          case 'gstCertificate':
            message = 'GST certificate uploaded successfully';
            break;
          default:
            message = 'File uploaded successfully';
        }
        toast.success(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Reset form fields
        setFormData({
          shopName: '',
          dob: '',
          firstName: '',
          middleName: '',
          lastName: '',
          phone: '',
          email: '',
          aadhar: '',
          pan: '',
          pinCode: '',
          postOffice: '',
          policeStation: '',
          houseDet: '',
          houseAddress: '',
          townAdd: '',
        });

        dispatch(uploadDocumentSuccess(type));
        event.target.value = '';
      }
    };
    input.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateFields()) {
      dispatch(submitFormData(formData));
      dispatch(updateFormData(formData));

      try {
        // Call sendEmail function
        await sendEmail(formData);

        // Show success message to user
        toast.success('Form submitted successfully! An email has been sent to the company.');

        // Redirect to confirmation page
        history.push('/confirm-seller');
      } catch (error) {
        console.error('Error sending email:', error);
        // Handle error (e.g., show error message to user)
        toast.error('Error sending confirmation email. Please try again later.');
      }
    }

    // if (validateFields()) {
    //   dispatch(submitFormData(formData));
    //   dispatch(updateFormData(formData));


    //   try {
    //     // Call sendEmail function
    //     await sendEmail(formData);

    //     // Show success message to user
    //     toast.success('Form submitted successfully! An email has been sent to the company.');

    //     // Redirect to confirmation page
    //     history.push('/confirm-seller');
    //   } catch (error) {
    //     console.error('Error sending email:', error);
    //     // Handle error (e.g., show error message to user)
    //     toast.error('Error sending email. Please try again later.');
    //   }
    // }
  };

  const sendEmail = async (formData) => {
    try {
      // Call API function to send email with form details
      const response = await sendFormSubmissionEmailToAuth(formData);
      console.log(response); // Log the response from the server

      // Show success toast notification
      toast.success('Email sent successfully!', {
        position: "top-center",
        autoClose: 3000, // Close the notification after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirect to Confirm seller page after successful form submission
      history.push('/confirm-seller');
    } catch (error) {
      console.error("Error submitting form:", error);

      // Show error toast notification
      toast.error('Error sending email. Please try again later.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };


  return (
    <>
      <div className="register-seller-container">
        <div className="reg-img-mail-section">
          <div className="extra-container">
            {/* <img src={regSeller} alt="" /> */}
            <img src={user?.avatar?.url} alt="My Image" />
            {/* <p>sayanizchad@gmail.com</p> */}
            <p>{user && user.email}</p>
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
                <input type="text" placeholder="Enter shop name"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  required
                />
                {/* {shopNameError && <p className="error">{shopNameError}</p>} */}
              </div>
              <div className="dob">
                <label htmlFor="">Date of Birth as per Aadhar card*</label>
                <input type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
                {/* {dobError && <p className="error">{dobError}</p>} */}
              </div>
            </div>
            <div className="form-reg-name">
              <div id="first-name">
                <label htmlFor="">First Name *</label>
                <input type="text" placeholder='Enter first name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                {/* {firstNameError && <p className='error'>{firstNameError}</p>} */}
              </div>
              <div id="middle-name">
                <label htmlFor="">Middle Name</label>
                <input type="text" placeholder='Enter middle name'
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </div>
              <div id="last-name">
                <label htmlFor="">Last Name *</label>
                <input type="text" placeholder='Enter last name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                {/* {lastName && <p className='error'>{lastNameError}</p>} */}
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
                      </select>
                    </div>
                  </div>
                  <div className="verification-section">
                    <input type="text" placeholder='00011 22000'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      disabled={phoneVerified}
                    />

                  </div>
                  {/* {phoneError && <p className='error'>{phoneError}</p>} */}
                  <button type="button"
                    disabled={phoneVerified}
                  >Send OTP</button>
                </div>
                <div className="phone-sect-2">
                  <input type="number" className="phone-input"
                    value={verifyPhone}
                    onChange={(e) => setVerifyPhone(e.target.value)}
                    disabled={phoneVerified}
                  />
                  <div className="btn-verify">
                    <button type="button"
                      disabled={phoneVerified}
                    >Verify</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-email">
              <label>Email ID *</label>
              <div className="email-section">
                <div className="email-sect-1">
                  <input type="email" placeholder='enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={emailVerified}
                  />
                  {/* {emailError && <p className="error">{emailError}</p>} */}
                  <button type="button"
                    disabled={emailVerified}
                  >Send OTP</button>
                </div>
                <div className="email-sect-2">
                  <input type="text"
                    value={verifyEmail}
                    onChange={(e) => setVerifyEmail(e.target.value)}
                    disabled={emailVerified}
                  />
                  <button type="button"
                    disabled={emailVerified}
                  >Verify</button>
                </div>
              </div>
            </div>
            <div className="form-aadhar">
              <div className="aadhar-section">
                <div className="aadhar-sect-1">
                  <label>Enter your Aadhar number *</label>
                  <input type="text" placeholder="Enter aadhar number"
                    value={aadhar}
                    onChange={(e) => setAadhar(e.target.value)}
                    required
                  />
                  {/* {aadharError && <p className="error">{aadharError}</p>} */}
                </div>
                <div className="aadhar-sect-2">
                  <label>Upload both side picture of Aadhar Card *</label>
                  <button onClick={(event) => handleUpload('Aadhar', event)}>Upload</button>
                </div>
              </div>
            </div>

            <div className="form-pan">
              <div className="pan-section">
                <div className="pan-sect-1">
                  <label>Enter your PAN Number *</label>
                  <input type="text" placeholder="Enter pan number"
                    value={pan}
                    onChange={(e) => setPan(e.target.value)}
                    required
                  />
                  {/* {panError && <p className='error'>{panError}</p>} */}
                </div>
                <div className="pan-sect-2">
                  <label>Upload both side picture of PAN Card *</label>
                  <div className="input-pan">
                    <button onClick={(event) => handleUpload('PAN', event)}>Upload</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-commercial-address">
              <label>Enter your Commercial Address *</label>
              <div className="commercial-section">
                <div className="comm-sect-1">
                  <label>Pincode</label>
                  <input type="text" placeholder='Enter pin number'
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    required
                  />
                  {/* {pinCodeError && <p className='error'>{pinCodeError}</p>} */}
                </div>
                <div className="comm-sect-2">
                  <label>Post Office</label>
                  <input type="text" placeholder="Enter post office"
                    value={postOffice}
                    onChange={(e) => setPostOffice(e.target.value)}
                    required
                  />
                  {/* {postOfficeError && <p className='error'>{postOfficeError}</p>} */}
                </div>
                <div className="comm-sect-3">
                  <label>Police Station</label>
                  <input type="text" placeholder="Enter police station"
                    value={policeStation}
                    onChange={(e) => setPoliceStation(e.target.value)}
                    required
                  />
                  {/* {policeStationError && <p className='error'>{policeStationError}</p>} */}
                </div>
              </div>
              <div className="address-section">
                <div className="address-sect-1">
                  <label>Flat, House no, Building, Company, Apartment</label>
                  <input type="text" placeholder="Enter house details"
                    value={houseDet}
                    onChange={(e) => setHouseDet(e.target.value)}
                    required
                  />
                  {/* {houseDetError && <p className='error'>{houseDetError}</p>} */}
                </div>
                <div className="address-sect-2">
                  <label>Area, Street, Sector, Village</label>
                  <input type="text" placeholder="Enter address details"
                    value={houseAddress}
                    onChange={(e) => setHouseAddress(e.target.value)}
                    required
                  />
                  {/* {houseAddressError && <p className='error'>{houseAddressError}</p>} */}
                </div>
                <div className="address-sect-3">
                  <label>Landmark</label>
                  <input type="text" placeholder='enter landmark'
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                  />
                </div>
                <div className="address-sect-4">
                  <div className="location-details">
                    <label>Town/City</label>
                    <input type="text"
                      placeholder="Enter town/city address"
                      value={townAdd}
                      onChange={(e) => setTownAdd(e.target.value)}
                      required
                    />
                    {/* {townAddError && <p className='error'>{townAddError}</p>} */}
                  </div>
                  <div className="choose-state">
                    <label>Choose a State</label>
                    <select name="state" defaultValue="West Bengal">
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
                  <button onClick={(event) => handleUpload('ADDRESS_DETAILS', event)}>Upload</button>
                </div>
              </div>
            </div>

            <div className="form-upload-account-details">
              <p>A copy of your current accounts cancelled cheque showing bank account number and account type with the account holders name and IFSC code *</p>
              <div className="btn-account-upload">
                <button onClick={(event) => handleUpload('ACCOUNT_DETAILS', event)}>Upload</button>
              </div>
            </div>

            <div className="form-gst">
              <label>GST Certificate *</label>
              <button onClick={(event) => handleUpload("GST", event)}>Upload</button>
            </div>

            <div className="btn-submit-div">
              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>

            </div>


          </form>
          <div className="pradeep-side">
            <img src={profileSide} alt="" />
          </div>
        </div>
      </div>
      <ToastContainer />

    </>
  );
};

export default RegisterSeller;
