/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './Contact.scss'
import './ContactAnimation.scss'
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm } from '../../Redux/Actions/contactAction';
import { ToastContainer, toast } from 'react-toastify';

const Contact = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const error = useSelector(state => state.contact.error);
  const success = useSelector(state => state.contact.success);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          setLoading(false);
        }, 600);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (success) {
      toast.success('Message sent successfully!');
      console.log("Message sent successfully");
    } else if (error) {
      toast.error(`Error: ${error}`);
      console.log(`Error: ${error}`);
    }
  }, [success, error]);

  const handleSubmitContactForm = (e) => {
    e.preventDefault();
    dispatch(submitContactForm({
      firstName,
      lastName,
      phone,
      email,
      message,
    }));
  }

  return (
    <>
      <ToastContainer />
      {
        loading ? (
          <div className="contact-animation">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : success ? (
          <div className="success-message">{success}</div>
        ) : (
          <div className="contact-container">
            <div className="contact-form">
              <h2>Contact us</h2>
              <form className="form" onSubmit={handleSubmitContactForm}>
                <div className="input-name">
                  <div id="first-name">
                    <label htmlFor="">First name</label>
                    <input type="text" placeholder="Enter First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div id="last-name">
                    <label htmlFor="">Last name</label>
                    <input type="text" placeholder="Enter Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="phone">
                  <label htmlFor="">Phone Number</label>
                  <input type="text" placeholder="69696 424244"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value) }}
                  />
                </div>
                <div className="email">
                  <label htmlFor="">Email</label>
                  <input type="email" placeholder="Enter email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                </div>
                <div className="message">
                  <label htmlFor="">Message</label>
                  <input type="textarea" placeholder="Your Message.."
                    value={message}
                    onChange={(e) => { setMessage(e.target.value) }}
                  />
                </div>
                <div className="btn-contact">
                  <button type="submit">Send Message</button>
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