import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { verifyEmail } from "../../Redux/Actions/userAction";
import "./ConfirmEmailScreen.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ConfirmEmailScreen = () => {
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, error, user, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const submitHandler = (e) => {
    e.preventDefault();
    const userId = user._id;
    dispatch(verifyEmail(userId, otp));
  };

  useEffect(() => {
    if (user && isAuthenticated) {
      history.push("/profile"); // Redirect to dashboard or home page after verification
    }
    if(error){toast.error(error, {
        position: "bottom-center",
        autoClose: 3000,
    })
}
  }, [user, history, isAuthenticated,error]);

  return (
    <>
      <div className="form-container">
        <ToastContainer/>
        <h2>Enter OTP to Verify you Email.</h2>
        <p className="otp-cautions">Please Enter OTP carefully, you only have one chance to verify your mail! Otherwise you will not able to register with this mail id again.</p>
        <form className="otp-form" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="otp-input"
          />
          <button type="submit" className="otp-btn">
            Verify
          </button>
          {loading && <p>Loading...</p>}
        </form>
      </div>
    </>
  );
};

export default ConfirmEmailScreen;
