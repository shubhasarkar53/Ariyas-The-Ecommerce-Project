/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import subLoginImg from "../../assets/Images/Login-Signup-page/rightLogin.png";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { clearError, forgotPasswordAction } from '../../Redux/Actions/userAction';
import Meta from "../../Meta";
function ForgotPassword() {
    const dispatch = useDispatch();
    const { loading,error,message,success} = useSelector(
        (state) => state.forgotPassword
      );
    const [email, setEmail] = useState("");

    function mailSubmit(e){
        e.preventDefault();
        console.log(email)
        dispatch(forgotPasswordAction(email))
        
    }

    useEffect(() => {
        if(success){
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
        }

         
        if (error) {
          toast.error(error, {
            position: "bottom-center",
            autoClose: 3000,
          });
          dispatch(clearError());
        }
      }, [dispatch, error ,success]);
    
     


    return (
        <>
        <Meta title="Forgot Password" />
          {loading ? (
            <Loader />
          ) : (
            
            <div className="loginContainer">
                <ToastContainer />
              <div className="overlay"></div>
              <div className="main-login width-30">
                
                <div className="login-lower">
                  <h2>Forgot Password</h2>
                  <form onSubmit={mailSubmit}>
                    <label htmlFor="Email">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <div className="btn-container">
                      <button className="logInSign-btn" type="submit">
                            Send Varification Mail
                      </button>
                    </div>
                  </form>

                </div>
              </div>
              <div className="pic-login">
                <img src={subLoginImg} alt="" />
              </div>
              
            </div>
         )} 
        </>
      );
}

export default ForgotPassword