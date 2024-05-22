/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import "./FAQ.scss";
import faq_img from "../../assets/Images/OtherImages/FAQs-cuate.png";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import Meta from "../../Meta"


const FAQs = () => {
  const faqItems = [
    {
      question: 'What is Ariyas?',
      answer:
        'Ariyas: Preserving Heritage, Crafting Elegance. Explore premium quality traditional goods that celebrate our rich cultural heritage. Embrace the essence of tradition with every purchase. Unveil the beauty of our heritage at Ariyas - Your Gateway to Timeless Elegance.',
    },
    {
      question: 'How do I place an order?',
      answer:
        'You can place an order by visiting our website and selecting the items you want to purchase. Once you have selected the items, you can proceed to checkout and make the payment.',
    },
    {
      question: 'How can I track my order?',
      answer:
        'You can track your order by visiting the "Track Order" page on our website and entering your order number. You will be able to see the status of your order and the estimated delivery date.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit and debit cards, as well as PayPal and other secure payment methods.',
    },
    {
      question: 'How can I contact customer service?',
      answer:
        'You can contact our customer service team by emailing us at info@ariyas.com or calling us at 123-456-7890. Our team is always available to assist you.',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const { loading } =
    useSelector((state) => state.products);


  return (
    <Fragment>
      {
        loading ? (<Loader />) : (
          <Fragment>
            <Meta title="FAQs" description="Frequently Asked Questions" />
            <div className="faq">
              <div className="top-faq">
                <div className="faq-left-div">
                  <p className="faq-title">FAQs</p>
                  <p className="faq-subtitle">
                    Welcome to our FAQ page! Below, we&apos;ve compiled a list of
                    commonly asked questions to provide you with quick and helpful
                    answers. Whether you&apos;re curious about our products, services,
                    policies, or anything else, we&apos;re here to assist you. If you
                    can&apos;t find the information you&apos;re looking for,
                    don&apos;t hesitate to reach out to our friendly customer support
                    team. We&apos;re dedicated to ensuring your experience with us is
                    as smooth and enjoyable as possible
                  </p>
                </div>
                <div className="faq-right-div">
                  <div className="faq-img">
                    <img src={faq_img} alt="faq" />
                  </div>
                </div>
              </div>

              <div className="bottom-faq">
                <h1>Frequently Asked Questions</h1>
                <div className="faq-container">
                  {faqItems.map((item, index) => (
                    <div className="faq-item" key={index}>
                      <div className="faq-question" onClick={() => handleToggle(index)}>
                        <h3>{item.question}</h3>
                        <span className="arrow-icon">{openIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                      </div>
                      {openIndex === index && <p className="faq-answer">{item.answer}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Fragment>)
      }
    </Fragment>
  );
};

export default FAQs;
