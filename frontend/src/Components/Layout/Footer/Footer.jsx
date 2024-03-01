/* eslint-disable no-unused-vars */
import React from "react";
import { RiSecurePaymentFill } from "react-icons/ri";
import {
  FaShippingFast,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";
import { TbTruckReturn } from "react-icons/tb";
import "./Footer.scss";
const Footer = () => {
  const socialIcons = [
    { icon: FaInstagram, url: "https://www.instagram.com/" },
    { icon: FaFacebook, url: "https://www.facebook.com/" },
    { icon: FaTwitter, url: "https://twitter.com/" },
    { icon: FaPinterest, url: "https://www.pinterest.com/" },
    // Add more icons as needed
  ];
  return (
    <>
      <div className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="element">
              <div className="symbol1">
                <RiSecurePaymentFill />
              </div>
              <div className="list-item1">Secure Payment</div>
            </div>

            <div className="sline"></div>

            <div className="element">
              <div className="symbol2">
                <FaShippingFast />
              </div>
              <div className="list-item2">Express Shipping</div>
            </div>

            <div className="sline"></div>

            <div className="element">
              <div className="symbol3">
                <TbTruckReturn />
              </div>
              <div className="list-item3">Free Return</div>
            </div>
          </div>
          <div className="line"></div>

          <div className="footer-middle">

            <div className="ariyas">
              <h3>Ariyas</h3>
              <p>

                Ariyas: Preserving Heritage, Crafting Elegance. Explore premium quality traditional goods that celebrate our rich cultural heritage. Embrace the essence of tradition with every purchase. Unveil the beauty of our heritage at Ariyas - Your Gateway to Timeless Elegance.
              </p>

              <div className="social-media">
                {socialIcons.map((socialIcon, index) => (
                  <a
                    key={index}
                    href={socialIcon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <socialIcon.icon />{" "}
                  </a>
                ))}
              </div>
            </div>

            <div className="shop">
              <h3>Shop</h3>
              {["Bags", "Dress", "Clay Items", "Wooden Items"].map(
                (item, index) => {
                  return (
                    <a href="#" key={index}>
                      {item}
                    </a>
                  );
                }
              )}
            </div>

            <div className="about">
              <h3>About</h3>
              {[
                "About Us",
                "Privacy Policy",
                "Terms & Conditions",
                "Become a Seller",
              ].map((item, index) => {
                return (
                  <a href="#" key={index}>
                    {item}
                  </a>
                );
              })}
            </div>

            <div className="need-help">
              <h3>Need Help?</h3>
              {["Contact Us", "FAQ"].map((item, index) => {
                return (
                  <a href="#" key={index}>
                    {item}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">Copyright © 2024. All Rights Reserved</div>
    </>
  );
};

export default Footer;
