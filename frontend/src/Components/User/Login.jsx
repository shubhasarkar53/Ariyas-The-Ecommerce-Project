import React, { useState, useEffect } from "react";
import "./Login.scss";
import subLoginImg from "../../assets/Images/Login-Signup-page/rightLogin.png";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, clearError } from "../../Redux/Actions/userAction";
import Loader from "../Loader/Loader";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({history}) => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error ,token } = useSelector(
    (state) => state.user
  );
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    // console.log(loginEmail,loginPassword);
    dispatch(userLogin(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error,{
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
        history.push("/account");
    }
  }, [dispatch, error,toast,history,isAuthenticated]);

  return (
    <>
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
                Lorem ipsum dolor sit amet consectetur{" "}
                <span className="login-highligt">adipisicing elit</span> facilis
                nisi.
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
            </div>
          </div>
          <div className="pic-login">
            <img src={subLoginImg} alt="" />
          </div>
             <ToastContainer/>
        </div>
      )}
    </>
  );
};

export default Login;
