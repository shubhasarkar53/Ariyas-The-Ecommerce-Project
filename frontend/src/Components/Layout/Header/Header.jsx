/* eslint-disable no-unused-vars */
import React from 'react'
import paperplane from "../../../assets/Images/Navbar/papperplane1.png"
import cart from "../../../assets/Images/Navbar/cart1.png"
import search from "../../../assets/Images/Navbar/search1.png"
import logo from "../../../assets/Images/Navbar/logo1.png"
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import "./Header.scss"
// import { Link } from 'react-router-dom'
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
                            const routes = {
                                Home: '/',
                                Sale: '/sale',
                                Shop: '/shop',
                                Contact: '/contact',
                                About: '/about',
                                Blog: '/blog'
                            };
                            return(
                                <Link to={routes[item]} key={index}>{item}</Link>
                            )
                        })
                    }
                </div>
                <div className="right-nav">

                <div className="icon-btns-container">
                    {
                        [
                             { icon: paperplane, path: '/paperplane' },
                             { icon: cart, path: '/cart' },
                             { icon: search, path: '/search' }
                        ].map((item, index) => {
                          return (
                                <div className="icon-btn" key={index}>
                                   <Link to={item.path}>
                                       <img src={item.icon} alt="icon" />
                                   </Link>
                                </div>
                                )
                            })
                    }
                </div>
                    
                    <div className="auth-btns-container">
                        <Link  to = {`/register/new`} className="auth-btn">Sign Up</Link>
                        <Link to = {`/login`} className="auth-btn">Login</Link>
                    </div>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default Header