/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './Contact.scss'
import './ContactAnimation.scss'
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm } from '../../Redux/Actions/contactAction';
import { ToastContainer, toast } from 'react-toastify';
import sendingMessage from '../../assets/Gifs/giphy.gif';
import Loader from './../Loader/Loader';
import Meta from "../../Meta";
import axios from 'axios';

const Contact = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showContactAnimation, setShowContactAnimation] = useState(false);
  const [fieldError, setFieldError] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    message: false,
  });
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
      // Send form data to backend route for sending email
      const response = await axios.post('/api/v1/contact', {
        firstName,
        lastName,
        phone,
        email,
        message,
      });
      // Handle success response
      toast.success(response.data.message);
      console.log("Message sent successfully");
    } catch (error) {
      // Handle error response
      toast.error(`Error: ${error.response.data.error}`);
      console.error(`Error: ${error.response.data.error}`);
    }

    // Validate form fields
    const errors = {};
    if (!firstName) {
      errors.firstName = true;
    }
    if (!lastName) {
      errors.lastName = true;
    }
    if (!phone) {
      errors.phone = true;
    }
    if (!email) {
      errors.email = true;
    }
    if (!message) {
      errors.message = true;
    }

    if (Object.keys(errors).length > 0) {
      // Set fieldError to highlight empty fields
      setFieldError(errors);
      toast.error('All fields are required. Please fill in all the fields.');
      return;
    }

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

      // Reload the page after successful form submission
      window.location.reload();

    } catch (error) {
      // Handle any errors that may occur during form submission
      toast.error(`Error: ${error}`);
      console.error(`Error: ${error}`);
    } finally {
      // Set loading to false after form submission (success or error)
      setLoading(false);

      // Clear fieldError state
      setFieldError({
        firstName: false,
        lastName: false,
        phone: false,
        email: false,
        message: false,
      });

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
    <Meta title="Contact Us" />
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
                        <label htmlFor="first-name">First name</label>
                        <input type="text" placeholder="Enter First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div id="last-name">
                        <label htmlFor="last-name">Last name</label>
                        <input type="text" placeholder="Enter Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="phone">
                      <label htmlFor="phone">Phone Number</label>
                      <input type="text" placeholder="69696 424244"
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value) }}
                      />
                    </div>
                    <div className="email">
                      <label htmlFor="email">Email</label>
                      <input type="email" placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="message">
                      <label htmlFor="message">Message</label>
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