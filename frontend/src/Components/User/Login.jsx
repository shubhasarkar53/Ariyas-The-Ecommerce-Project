import React, { useState } from 'react'
import "./Login.scss"
import subLoginImg from "../../assets/Images/Login page/rightLogin.png";
import {useDispatch,useSelector} from "react-redux";
import {userLogin,clearError} from "../../Redux/Actions/userAction";

const Login = () => {

    const dispatch = useDispatch();

    const [loginEmail,setLoginEmail] = useState("");
    const [loginPassword,setLoginPassword] = useState("");

    const loginSubmit =(e) =>{
        e.preventDefault();
        console.log(loginEmail,loginPassword);
        dispatch(userLogin(loginEmail,loginPassword));
    }


  return (
    <>
        <div className='loginContainer'>
            <div className="overlay"></div>
            <div className="main-login">
                {/* <img src={mainLoginImg} alt="" /> */}
                <div className="login-upper">
                    <h1 className="login-heading">Welcome Back</h1>
                    <p className="login-txt">Lorem ipsum dolor sit amet consectetur <span className='login-highligt'>adipisicing elit</span> facilis nisi.</p>
                </div>
                <div className="login-lower">
                    <h2>User Login</h2>
                    <form onSubmit={loginSubmit}>
                        <label htmlFor="Email">Email Address</label>
                        <input 
                            type="email" 
                            name="loginEmail" 
                            placeholder='Enter Your Email'
                            value={loginEmail} 
                            required
                            onChange={(e) => (setLoginEmail(e.target.value))}
                            />
                        <label htmlFor="loginPass">Password</label>
                        <input
                            type="password" 
                            name="loginPass" 
                            placeholder='Enter Your Password'
                            value={loginPassword} 
                            required
                            onChange={(e) => (setLoginPassword(e.target.value))}
                            />
                        <div className="btn-container">
                            <button className='logInSign-btn' type="submit" >Login</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="pic-login">
                <img src={subLoginImg} alt="" />
            </div>
        </div>
    </>
  )
}

export default Login