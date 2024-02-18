/* eslint-disable no-unused-vars */
import React from 'react'
import './Footer.scss'
import { FaShippingFast, FaLock, FaUndo } from 'react-icons/fa';
// import { AiFillInstagram,FaTwitter } from "react-icons/ai";
// import { RiMastercardFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="footer-m">
    <div className="divelementor-element">
      <div className="divelementor-element1">
        <div className="divelementor-widget-container">
          <div className="list-item">Secure Payment</div>
          <div className="symbol"><FaLock/></div>
        </div>
      </div>
      <div className="divelementor-element2">
        <div className="divelementor-widget-container">
          <div className="list-item1">Express Shipping</div>
          <div className="symbol1"><FaShippingFast/></div>
        </div>
      </div>
      <div className="divelementor-widget-container2">
        <div className="list-item2">Free Return</div>
        <div className="symbol2"><FaUndo/></div>
      </div>
    </div>
    <div className="heading-4">Ariyas</div>
    <div className="lorem-ipsum-dolor">Lorem ipsum dolor sit amet,</div>
    <div className="sed-efficitur-ex">Sed efficitur ex purus.</div>
    <div className="aenean-convallis-velit">Aenean convallis velit vel</div>
    <div className="nisi-tempus-pulvinar">nisi tempus pulvinar.</div>
    <div className="link">
      <div className="symbol3"></div>
    </div>
    <div className="link1">
      <div className="symbol4"></div>
    </div>
    <div className="link2">
      <div className="symbol5"></div>
    </div>
    <div className="link3">
      <div className="symbol5"></div>
    </div>
    <div className="heading-5">Shop</div>
    <div className="nav-list">Dress</div>
    <div className="nav-list1">Handmade Trinkets:</div>
    <div className="nav-list2">bags</div>
    <div className="heading-51" >
      About
    </div>
    <div className="nav-list3">
      Home
    </div>
    <div className="nav-list4" >
      Contact
    </div>
    <div className="nav-list5">
      Become a Seller
    </div>
    <div className="heading-52">Need Help?</div>
    <div className="nav-list6">Shop</div>
    <div className="nav-list7">My account</div>
    <div className="nav-list8">Cart</div>
    <div className="nav-list9">Checkout</div>
    <div className="divelementor-element3">
     
    </div>
  </div>
  )
}

export default Footer
