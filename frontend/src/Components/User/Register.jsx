import React, { useState, useEffect } from "react";

import subRegisterImg from "../../assets/Images/Login-Signup-page/signUpMainImg.png";
import { useDispatch, useSelector } from "react-redux";
import {  clearError, userRegister } from "../../Redux/Actions/userAction";
import Loader from "../Loader/Loader";

import "./Register.scss"
import "./Login.scss"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = ({history}) => {
    // const loading = false;
    const dispatch = useDispatch();
    const {loading,error,isAuthenticated} = useSelector(state=>state.user);

    const [user,setUser] = useState({
        fullName:"",
        registerEmail:"",
        phone:"",
        registerPass:"",
        confirmRegisterPass:""

    });

    
    const {fullName,registerEmail,phone,registerPass,confirmRegisterPass} = user


    const registerFormData =(e)=>{
        
        setUser({...user,[e.target.name]: e.target.value});
        
    }

    const registerSubmit = (e) =>{
        e.preventDefault();
        

        if (registerPass !== confirmRegisterPass) {
          toast.error("Password doesn't match with confirm password!",{
            position: "bottom-center",
            autoClose: 3000,
          });
          return; // Exit the function without submitting the form
      }


        const myFromData = new FormData();

        myFromData.set("name",fullName);
        myFromData.set("email",registerEmail);
        myFromData.set("phone",phone);
        myFromData.set("password",registerPass);
        // myFromData.set("confirmRegisterPass",confirmRegisterPass);
        // console.log( "inside:",fullName,registerEmail,phone,registerPass,confirmRegisterPass);
        dispatch(userRegister(myFromData));
    }


    useEffect(()=>{
        if (error) {
            toast.error(error,{
                position: "bottom-center",
                autoClose: 3000,
              });
            dispatch(clearError());
        }

        if (isAuthenticated) {
            toast.success("Registration Successful",{
                position: "bottom-center",
                autoClose: 3000,
              });
            history.push("/");
        }
    },[dispatch,toast,error,history,isAuthenticated])

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
                  <h1 className="login-heading">Sign Up to Discover Local Treasures</h1>
                  <p className="login-txt">Buy & Sell today, tomorrow, and beyond <span className="login-highligt"> Empower  Local Artician’s</span>
                  </p>
                </div>
                <div className="login-lower">
                  <h2>New User Register</h2>
                  
                <form onSubmit={registerSubmit}>

                  <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Eg. Ram Sarkar"
                      value={fullName}
                      required
                      onChange={registerFormData}
                    />

                    <label htmlFor="registerEmail">Email Address</label>
                    <input
                      type="email"
                      name="registerEmail"
                      placeholder="Eg. example123@gmail.com"
                      value={registerEmail}
                      required
                      onChange={registerFormData}
                    />

                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="Eg. 1234567890"
                      value={phone}
                      required
                      onChange={registerFormData}
                    />

                    <label htmlFor="registerPass">Create Password</label>
                    <input
                      type="password"
                      name="registerPass"
                      placeholder="Create a Password"
                      value={registerPass}
                      required
                      onChange={registerFormData}
                    />

                    <label htmlFor="confirmRegisterPass">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmRegisterPass"
                      placeholder="Re-enter the Password"
                      value={confirmRegisterPass}
                      required
                      onChange={registerFormData}
                    />

                    <div className="btn-container">
                      <button className="logInSign-btn" type="submit">
                        Create Account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="pic-login">
                <img src={subRegisterImg} alt="" />
              </div>
              <ToastContainer/>
            </div>
          )}
        </>
      );
    };

export default Register