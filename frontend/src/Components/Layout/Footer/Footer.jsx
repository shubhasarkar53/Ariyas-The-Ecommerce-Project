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
    <div className="heading-4">Ariyas
    <p>Crafting Dreams, Empowering Artists: Discover Handmade Treasures at Ariyas</p>
    </div>
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
    <div className="heading-shop">Shop
    {
                        ["Bags","Dress","Clay Items","Wooden Items"].map((item,index)=>{
                            return(
                                <a href="#" key={index}>{item}</a>
                            )
                        })
                    }
    </div>
    <div className="heading-about" >
      About
      {
                        ["Home","Sale","Shop","Contact","Become a Seller"].map((item,index)=>{
                            return(
                                <a href="#" key={index}>{item}</a>
                            )
                        })
                    }
    </div>

   
    <div className="heading-needHelp">Need Help?
      {
                        ["FAQ","Shipping & Returns"].map((item,index)=>{
                            return(
                                <a href="#" key={index}>{item}</a>
                            )
                        })
      }
    </div>
    <div className="divelementor-element3">
     
    </div>
  </div>
  )
}

export default Footer
