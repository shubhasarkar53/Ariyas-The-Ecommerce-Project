/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './Contact.scss'
import './ContactAnimation.scss'
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm } from '../../Redux/Actions/contactAction';
import { ToastContainer, toast } from 'react-toastify';
import sendingMessage from '../../assets/Gifs/giphy.gif';
import Loader from './../Loader/Loader';

const Contact = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showContactAnimation, setShowContactAnimation] = useState(false);
  const error = useSelector(state => state.contact.error);
  const success = useSelector(state => state.contact.success);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmitContactForm = async (e) => {
    e.preventDefault();

    try {
      // Set loading to true when initiating form submission
      setLoading(true);

      // Set showContactAnimation to true when initiating form submission
      setShowContactAnimation(true);

      // Dispatch the form submission action
      await dispatch(submitContactForm({
        firstName,
        lastName,
        phone,
        email,
        message,
      }));

      // Form submission successful
      toast.success('Message sent successfully!');
      console.log("Message sent successfully");

    } catch (error) {
      // Handle any errors that may occur during form submission
      toast.error(`Error: ${error}`);
      console.error(`Error: ${error}`);
    } finally {
      // Set loading to false after form submission (success or error)
      setLoading(false);

      // Hide contact animation after 2 seconds
      setTimeout(() => {
        setShowContactAnimation(false);
      }, 2000);
    }
  }

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

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <>
          {showContactAnimation && (
            <div className="contact-animation">
              <div className="contact-animation">
                <img src={sendingMessage} alt="Sending Message" />
                <div className="send-message">
                  <h1>Sending Message</h1>
                  <div className="dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {
            error ? (
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

            )}
        </>
      )}
    </>
  )
}


export default Contact