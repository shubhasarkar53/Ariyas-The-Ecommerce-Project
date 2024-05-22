/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./Login.scss";
import subLoginImg from "../../assets/Images/Login-Signup-page/rightLogin.png";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, clearError, clearPopupMessage } from "../../Redux/Actions/userAction";
import Loader from "../Loader/Loader";
import PropTypes from 'prop-types';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Meta from "../../Meta";
const Login = ({ history, location }) => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error, token } = useSelector(
    (state) => state.user
  );
  const { pwdReset,message} = useSelector(
    (state) => state.forgotPassword
  );


 
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    // console.log(loginEmail,loginPassword);
    dispatch(userLogin(loginEmail, loginPassword));
  };

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/profile";

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        autoClose: 3000,
      });
      dispatch(clearError());
    }
    // if(!token){
    //   toast.success("Welcome To Ariyas !",{
    //     position: "bottom-center",
    //     autoClose: 3000,
    //   });
    // }

    if (isAuthenticated) {
      history.push(redirect);
    }


    if(message){
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });

        dispatch(clearPopupMessage());
    }

  }, [dispatch, error, history, isAuthenticated,redirect,pwdReset]);

  return (
    <>
      <Meta title="Login | Ariyas | Artisans Portal" />
      {loading ? (
        <Loader />
      ) : (
        <div className="loginContainer">
          <div className="overlay"></div>
          <div className="main-login">
            {/* <img src={mainLoginImg} alt="" /> */}
            <div className="login-upper">
              <h1 className="login-heading">Welcome Back</h1>
              <p className="login-txt">
                Buy & Sell today,tommorow and beyond{" "}
                <span className="login-highligt">Empower Local Artisans</span>
              </p>
            </div>
            <div className="login-lower">
              <h2>User Login</h2>
              <form onSubmit={loginSubmit}>
                <label htmlFor="Email">Email Address</label>
                <input
                  type="email"
                  name="loginEmail"
                  placeholder="Enter Your Email"
                  value={loginEmail}
                  required
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <label htmlFor="loginPass">Password</label>
                <input
                  type="password"
                  name="loginPass"
                  placeholder="Enter Your Password"
                  value={loginPassword}
                  required
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <div className="btn-container">
                  <button className="logInSign-btn" type="submit">
                    Login
                  </button>
                </div>
              </form>
              <div className="forgotContainer">
                <Link to={"/password/forgot"}>Forgot Password?</Link>
              </div>
            </div>
          </div>
          <div className="pic-login">
            <img src={subLoginImg} alt="" />
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

Login.propTypes = {
  history: PropTypes.object
}

export default Login;
