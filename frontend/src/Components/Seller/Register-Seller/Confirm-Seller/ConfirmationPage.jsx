/* eslint-disable no-unused-vars */
import React from 'react'
import './ConfirmationPage.scss';
import {
  FaShippingFast,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ConfirmationPage = () => {

  const history = useHistory();

  const socialIcons = [
    { icon: FaInstagram, url: "https://www.instagram.com/" },
    { icon: FaFacebook, url: "https://www.facebook.com/" },
    { icon: FaTwitter, url: "https://twitter.com/" },
    { icon: FaPinterest, url: "https://www.pinterest.com/" },
    // Add more icons as needed
  ];

  const handleGoBack = () => {
    history.push('/profile');
  };
  return (
    <>
      <div className='confirmation-container'>
        <div className="confirmation">

          <h2>Confirmation Page</h2>
          <p>Thank you for your submission. We have sent a confirmation email to your email address. Regarding your registration as a seller, we are excited for you to be a part of our family. Once we finish with our documentation procedure regarding your application and after finishing with the review. We will get back to you via email. If there are any queries, you can contact us on our official email- ariyaslifesaver05@gmail.com</p>
          <h3>
            Here are our official social pages:
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
          </h3>
          <div className="btn-confirm">
            <button onClick={handleGoBack}>Go back</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmationPage