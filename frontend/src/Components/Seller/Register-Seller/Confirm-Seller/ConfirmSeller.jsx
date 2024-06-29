/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './ConfirmSeller.scss';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { updateFormData } from '../../../../Redux/Actions/registerSellerAction';
import axios from 'axios';
import { toast } from 'react-toastify';
import { sendFormSubmissionEmail } from '../../../../../../backend/apii/index.js';

const ConfirmSeller = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formData = useSelector((state) => state.registerSeller.formData);
  const uploadedDocuments = useSelector((state) => state.registerSeller.uploadedDocuments);

  const handleUpdate = () => {
    dispatch(updateFormData(formData));
    history.push({
      pathname: '/register-seller',
      state: { formData: formData },
    });
  }
  // const handleUpdate = () => {
  //   // Pass only necessary form data fields as state when navigating to RegisterSeller
  //   const updatedFormData = {
  //     shopName: formData.shopName,
  //     dob: formData.dob,
  //     firstName: formData.firstName,
  //     lastName: formData.lastName,
  //     phone: formData.phone,
  //     email: formData.email,
  //     aadhar: formData.aadhar,
  //     pan: formData.pan,
  //     pinCode: formData.pinCode,
  //     postOffice: formData.postOffice,
  //     policeStation: formData.policeStation,
  //     houseDet: formData.houseDet,
  //     houseAddress: formData.houseAddress,
  //     townAdd: formData.townAdd,
  //   };

  //   history.push({
  //     pathname: '/register-seller',
  //     state: { formData: updatedFormData },
  //   });
  // };

  const handleSubmit = async () => {
    try {
      // Dispatch action to update form data (if needed)
      dispatch(updateFormData(formData));

      // Call API function to send email with form details
      const response = await sendFormSubmissionEmail(formData);
      console.log(response); // Log the response from the server
      // Redirect to ConfirmationPage after successful form submission
      history.push('/confirmation');
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error if form submission fails
    }
  };



  return (
    <>
      <div className="confirm-seller-container">
        <div className="confirm-container">
          <h2>Confirm Seller Details</h2>
          <div className="bar"></div>
          <div className="confirm-details">
            {Object.entries(formData).map(([key, value]) => (
              <>
                <p key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                </p>
                {uploadedDocuments && (
                  <div className="uploaded-documents">
                    <h3>Uploaded Documents:</h3>
                    <ul>
                      {uploadedDocuments.map((document, index) => (
                        <li key={index}>{document}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ))}
          </div>
          <div className="update-details">
            <p>Update your details if necessary</p>
            <button onClick={handleUpdate}>Update</button>
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
