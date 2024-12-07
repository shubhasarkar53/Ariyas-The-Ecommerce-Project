/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.scss";
import profileSide from "../../assets/Images/Icons/profile icons/pngwing 3.png";
import { useDispatch, useSelector } from "react-redux";
import { clearError, updateUserPassword } from "../../Redux/Actions/userAction";
import { UPDATE_USER_PASSWORD_RESET } from "../../Redux/Constants/userConstant";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Meta from "../../Meta"

const UpdatePassword = ({ history }) => {
  const { error, loading, isUpdated } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { oldPassword, newPassword, confirmPassword } = passwords;

  // Function to handle onChange of input fields
  function handleUpdatePassChange(e) {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  }

  function handleUpdatedPassSubmit(e) {
    e.preventDefault();
    const newPasswords = new FormData();

    newPasswords.set("oldPassword", oldPassword);
    newPasswords.set("newPassword", newPassword);
    newPasswords.set("confirmPassword", confirmPassword);

    // console.log(passwords);
    // dispatch
    dispatch(updateUserPassword(newPasswords));
  }

  useEffect(() => {
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
      toast.success("Password Updated Successfully", {
        position: "bottom-center",
        autoClose: 3000,
      });
      //   console.log("upatded successfully");
      history.push("/profile");

      dispatch({ type: UPDATE_USER_PASSWORD_RESET });
      //   console.log("UPDATE_USER_PASSWORD_RESET");
    }
  }, [dispatch, error, history, isUpdated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Meta title="Update Password" />
          <div className="container">
            <div className="update-password-container">
              <ToastContainer />
              <div className="left-deep">
                <img src={profileSide} alt="Background Image" />
              </div>

              <form
                className="update-pass-form"
                onSubmit={handleUpdatedPassSubmit}
              >
                <h2 className="update-password-title">Change Password</h2>
                <div className="update-password-input-fields">
                  <label htmlFor="oldPassword">Old Password: </label>
                  <input
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    value={oldPassword}
                    placeholder="Old Password"
                    onChange={handleUpdatePassChange}
                  />
                  <label htmlFor="newPassword">New Password: </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    value={newPassword}
                    placeholder="New Password"
                    onChange={handleUpdatePassChange}
                  />
                  <label htmlFor="confirmPassword">Confirm Password: </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleUpdatePassChange}
                  />
                  <div className="updatePassword-btn-container">
                    <button type="submit">Save Changes</button>
                  </div>
                </div>
              </form>

              <div className="right-deep">
                <img src={profileSide} alt="Background Image" />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default UpdatePassword;
