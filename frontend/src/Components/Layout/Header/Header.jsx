/* eslint-disable no-unused-vars */
import React from 'react'
import paperplane from "../../../assets/Images/Navbar/papperplane1.png"
import cart from "../../../assets/Images/Navbar/cart1.png"
import search from "../../../assets/Images/Navbar/search1.png"
import logo from "../../../assets/Images/Navbar/logo1.png"
import "./Header.scss"
const Header = () => {
  return (
    <div>
        <header>
            <nav>
                <div className="left-nav">
                        <img src={logo} alt="" />
                </div>
                <div className="mid-nav">
                    {
                        ["Home","Sale","Shop","Contact","About","Blog"].map((item,index)=>{
                            return(
                                <a href="#" key={index}>{item}</a>
                            )
                        })
                    }
                </div>
                <div className="right-nav">
                    <div className="icon-btns-container">
                        {
                            [paperplane,cart,search].map((imgUrl,index)=>{
                                return(
                                    <div className="icon-btn" key={index}>
                                        <img src={imgUrl} alt="icon" />
                                    </div>      
                                )
                            }) 
                        }
                    </div>
                    <div className="auth-btns-container">
                        <div className="auth-btn">Sign Up</div>
                        <div className="auth-btn">Login</div>
                    </div>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default Header