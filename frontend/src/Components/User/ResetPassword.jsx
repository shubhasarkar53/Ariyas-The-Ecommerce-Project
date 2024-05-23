import React, { Fragment, useState, useEffect } from "react";
import "../Dashboard/UpdatePassword.scss";
import profileSide from "../../assets/Images/Icons/profile icons/pngwing 3.png";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  resetPasswordAction,
} from "../../Redux/Actions/userAction";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@mui/material";

function ResetPassword({ history, match }) {
  const { error, loading, pwdReset, message } = useSelector(
    (state) => state.forgotPassword
  );

  const dispatch = useDispatch();
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { newPassword, confirmPassword } = passwords;

  function handleUpdatePassChange(e) {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  }

  function handleUpdatedPassSubmit(e) {
    e.preventDefault();
    const newPasswords = new FormData();

    newPasswords.set("password", newPassword);
    newPasswords.set("confirmPassword", confirmPassword);

    // console.log(passwords);
    // dispatch
    console.log(match.params.token, newPasswords);
    dispatch(resetPasswordAction(match.params.token, newPasswords));
  }

  useEffect(() => {
    if (pwdReset) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      history.push("/login");
    } else if (error) {
      toast.error(error, {
        position: "bottom-center",
        autoClose: 3000,
      });
      dispatch(clearError());
    }
  }, [dispatch, error, pwdReset]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <ToastContainer />
          <div className="containerResPass">
            <div className="update-password-container">
              <div className="left-deep">
                <img src={profileSide} alt="Background Image" />
              </div>

              <form
                className="update-pass-form"
                onSubmit={handleUpdatedPassSubmit}
              >
                <Typography variant="h3" className="typoH" align="center">
                  Shop From Your Favourite Location
                </Typography>
                <div className="update-password-input-fields">
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
                    <button type="submit">Reset Password</button>
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
}

export default ResetPassword;
