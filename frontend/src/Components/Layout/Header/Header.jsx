/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import paperplane from "../../../assets/Images/Navbar/papperplane1.png";
import cart from "../../../assets/Images/Navbar/cart1.png";
import search from "../../../assets/Images/Navbar/search1.png";
import logo from '../../../assets/Images/Navbar/logo.png';
import userImgPlaceHolder from "../../../assets/Images/Navbar/person.png";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";

import "./Header.scss";
const Header = () => {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );

  // Get the cart items from the redux store
  const { cartItems } = useSelector((state) => state.cart);
  const total = cartItems.length;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const hamburgerMenuItems = [
    { label: "Home", path: "/" },
    { label: "Sale", path: "/sale" },
    { label: "Shop", path: "/shop" },
    { label: "Contact", path: "/contact" },
    { label: "About", path: "/about" },
    { label: "Search", path: "/search" },
    { label: "Blog", path: "/blog" },
    { label: "My Account", path: "/profile" },
    { label: "Cart", path: "/cart" },
    { label: "Wishlist", path: "/wishlist" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <Fragment>
      <header>
        <nav>
          <div className="left-nav">
           <Link to="/">
           <img src={logo} alt="ariyas" style={{ filter: "invert(60)" }} />
           </Link>
          </div>
          {/* <div className={`mid-nav ${isMenuOpen ? 'mobile-menu-link' : ''}`}> */}
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
                    <button >{item}</button>
                  </Link>
                );
              }
            )}


          </div>
          <div className="right-nav">

            <div className="icon-btns-container">
              {[
                { icon: paperplane, path: "/location" },
                { icon: cart, path: "/cart", },
                { icon: search, path: "/search" },
              ].map((item, index) => {
                return (
                  <div className="icon-btn " key={index} >
                    <Link to={item.path}>
                      <img src={item.icon} alt="icon" />
                      {total !== undefined && item.path === "/cart" && <span className="count-badge">{total}</span>}
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
                      <img src={user.avatar.url || userImgPlaceHolder} alt={"User"} />
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
              <div className="hamburger-menu">
                <a href="#" onClick={toggleMenu}>
                  <GiHamburgerMenu />
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* Hamburger menu */}
      {isMenuOpen && (
        <div className='mobile-menu-link'>
          <div>
            <a href="#" className={`close-menu-btn`} onClick={closeMenu}>
              <IoIosCloseCircleOutline />
            </a>
          </div>
          <ul className="nav-links">
            {hamburgerMenuItems.map((item, index) => (
              <>
                <Link to={item.path} onClick={closeMenu}>
                  <li key={index} className="nav-items">
                    {item.label}
                  </li>
                </Link>
              </>
            ))}
          </ul>
        </div>
      )
      }
    </Fragment>
  );
};

export default Header;
