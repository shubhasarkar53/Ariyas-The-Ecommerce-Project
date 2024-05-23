/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import profileSide from "../../assets/Images/Icons/profile icons/pngwing 3.png";
import "./UpdateProfile.scss";
import {
  clearError,
  loadUser,
  updateUserProfile,
} from "../../Redux/Actions/userAction.js";
import { UPDATE_USER_RESET } from "../../Redux/Constants/userConstant.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Meta from "../../Meta.jsx"
import { Typography } from "@mui/material";

const UpdateProfile = ({ history }) => {
  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);
  const dispatch = useDispatch();


  const [formData, setFromData] = useState({
    fullName: "",
    phone: "",
    dob: "",
    gender: "",
  });
  const { fullName, phone, dob, gender } = formData;
  const [avatar, setAvatar] = useState("");


  function updateFormDataChange(e) {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          // console.log(reader.result);
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setFromData({ ...formData, [e.target.name]: e.target.value })
      // console.log("from update form change:", formData);
    }

  }




  function handleUpdateFormSubmit(e) {
    e.preventDefault();

    const myFormData = new FormData();
    myFormData.set("name", fullName);
    myFormData.set("phone", phone);
    // myFormData.set("dob", dob);
    myFormData.set("gender", gender);
    myFormData.set("avatar", avatar);
    // console.log(myFormData);
    // myFormData.forEach(item => console.log(item))
    dispatch(updateUserProfile(myFormData));
  }


  useEffect(() => {

    if (user) {
      setFromData({
        fullName: user.name,
        gender: user.gender,
        dob: user.dob,
        phone: user.phone,
        // avatar: user.avatar.url,
      });
    }
    if (error) {
      // some toast
      toast.error(error, {
        position: "bottom-center",
        autoClose: 3000,
      });
      // console.log("useeffect:", error);
      dispatch(clearError());
    }

    if (isUpdated) {
      // some tost upatded successfully
      toast.success("Profile Updated Successfully", {
        position: "bottom-center",
        autoClose: 3000,
      });
      // console.log("upatded successfully");
      dispatch(loadUser());
      history.push("/profile");

      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, history, user, isUpdated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Meta title={`Edit Profile - ${user?.name}`} />
          <div className="profile-title">
          <Typography variant="h4" className="typoH" align="center">
              Edit Profile
            </Typography>
          </div>
          <div className="update-profile-container">
            <ToastContainer />
            <div className="left-deep">
              <img src={profileSide} alt="Background Image" />
            </div>
            <div className="update-profile-det-container">
              {/* Left side of the profile */}
              <form
                className="edit-profile-details-form"
                onSubmit={handleUpdateFormSubmit}
              >
                <div className="edit-profile-title">Profile Information</div>
                <div className="edit-avatar-container">
                  <div className="update-img-profile">
                    <img src={user?.avatar?.url} alt="My Image" />
                  </div>
                  <div className="update-img-profile-option">
                    <label>Change Profile Picture</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="avatar"
                      className="choose-avatar"
                      onChange={updateFormDataChange}
                    />
                    {/* <button>Upload</button> */}
                  </div>
                </div>
                <div className="form-inputs">
                  <label htmlFor="fullName">Full Name:</label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={fullName}
                    onChange={updateFormDataChange}
                  />
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={updateFormDataChange}
                  />
                  {/* <label htmlFor="dob">DOB:</label> */}
                  {/* <input
                      type="date"
                      name="dob"
                      id="dob"
                      value={dob}
                      onChange={updateFormDataChange}
                    /> */}
                  <label htmlFor="dob">Gender</label>
                  <select
                    name="gender"
                    id="gender"
                    value={gender}
                    onChange={updateFormDataChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Other</option>
                  </select>
                  <div className="edit-profile-btn-container">
                    <button type="submit">Save Changes</button>
                  </div>
                </div>
              </form>
            </div>

            {/* Right side of the profile */}
            <div className="right-deep">
              <img src={profileSide} alt="Background Image" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
