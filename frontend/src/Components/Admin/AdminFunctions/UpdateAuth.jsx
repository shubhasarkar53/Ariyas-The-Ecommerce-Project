// src/components/UpdateAuthorization.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UpdateAuthorization.scss'; // Import the SCSS file

const UpdateAuthorization = () => {
  const dispatch = useDispatch();
//   const { email, authorization } = useSelector((state) => state.user);

  const handleEmailChange = (e) => {
    // dispatch(setEmail(e.target.value));
    console.log("first")
  };

  const handleAuthorizationChange = (e) => {
    // dispatch(setAuthorization(e.target.value));
    console.log("first")
  };

  const handleUpdate = () => {
    // alert(`Email: ${email}, Authorization: ${authorization}`);
    console.log("first")
  };

  return (
    <div className="update-authorization">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search User, Seller & Admin"
        //   value={email}
          onChange={handleEmailChange}
        />
        <button type="button">
          <i className="fa fa-search"></i>
        </button>
      </div>
      <div className="update-form">
        <input
          type="email"
        //   value={email}
          onChange={handleEmailChange}
          className="email-input"
        />
        <select
        //   value={authorization}
          onChange={handleAuthorizationChange}
          className="authorization-select"
        >
          <option value="User">User</option>
          <option value="Seller">Seller</option>
          <option value="Admin">Admin</option>
        </select>
        <button onClick={handleUpdate} className="update-button">
          Update
        </button>
      </div>
      <div className="footer-left">footer-L</div>
    </div>
  );
};

export default UpdateAuthorization;
