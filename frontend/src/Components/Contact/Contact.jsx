/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './Contact.scss'
import './ContactAnimation.scss'

const Contact = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          setLoading(false);
        }, 600);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {
        loading ? (
          <div className="contact-animation">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="contact-container">
            <div className="contact-form">
              <h2>Contact us</h2>
              <form className="form">
                <div className="input-name">
                  <div id="first-name">
                    <label htmlFor="">First name</label>
                    <input type="text" placeholder="Enter First Name" />
                  </div>
                  <div id="last-name">
                    <label htmlFor="">Last name</label>
                    <input type="text" placeholder="Enter Last Name" />
                  </div>
                </div>
                <div className="phone">
                  <label htmlFor="">Phone Number</label>
                  <input type="text" placeholder="69696 424244" />
                </div>
                <div className="email">
                  <label htmlFor="">Email</label>
                  <input type="email" placeholder="Enter email" />
                </div>
                <div className="message">
                  <label htmlFor="">Message</label>
                  <input type="textarea" placeholder="Your Message.." />
                </div>
                <div className="btn-contact">
                  <button>Send Message</button>
                </div>
              </form>
            </div>
          </div>

        )
      }
    </>
  )
}

export default Contact