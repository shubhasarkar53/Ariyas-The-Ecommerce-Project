/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from "react";
import paperplane from "../../../assets/Images/Navbar/papperplane1.png";
import cart from "../../../assets/Images/Navbar/cart1.png";
import search from "../../../assets/Images/Navbar/search1.png";
import logo from '../../../assets/Images/Navbar/logo.png';
import userImgPlaceHolder from "../../../assets/Images/Navbar/person.png";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

import "./Header.scss";
const Header = () => {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  return (
    <Fragment>
      <header>
        <nav>
          <div className="left-nav">
            <img src={logo} alt="ariyas" style={{ filter: "invert(60)" }} />
          </div>
          <div className="mid-nav">
            {["Home", "Sale", "Shop", "Contact", "About", "Blog"].map(
              (item, index) => {
                const routes = {
                  Home: "/",
                  Sale: "/sale",
                  Shop: "/shop",
                  Contact: "/contact",
                  About: "/about",
                  Blog: "/blog",
                };
                return (
                  <Link to={routes[item]} key={index}>
                    {item}
                  </Link>
                );
              }
            )}
          </div>
          <div className="right-nav">
            <div className="icon-btns-container">
              {[
                { icon: paperplane, path: "/paperplane" },
                { icon: cart, path: "/cart" },
                { icon: search, path: "/search" },
              ].map((item, index) => {
                return (
                  <div className="icon-btn" key={index}>
                    <Link to={item.path}>
                      <img src={item.icon} alt="icon" />
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="auth-btns-container">
              {isAuthenticated ? (
                <div className="avatar-img">
                  {user.avatar && user.avatar.url ? (
                    <Link to={"/profile"}>
                      <img src={user.avatar.url} alt="icon" />
                    </Link>
                  ) : (
                    <Link to={"/profile"}>
                      <img className="avatarPlaceholder" src={userImgPlaceHolder} alt="icon" />
                    </Link> // A little bug is here so I have given a placeholder of UserImg here ft.Shubha
                  )}
                </div>
              ) : (
                <>
                  <Link to={`/register/new`} className="auth-btn">
                    Sign Up
                  </Link>
                  <Link to={`/login`} className="auth-btn">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
