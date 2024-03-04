/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import "./FAQ.scss";
import faq_img from "../../assets/Images/OtherImages/FAQs-cuate.png";

const FAQs = () => {
  return (
    <Fragment>
      <div className="faq">
        <div className="top-faq">

          <div className="left-div">
            <p className="left-title">FAQ&apos;s</p>
            <p className="left-subtitle">
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

          <div className="right-div">
            <img src={faq_img} alt="faq" />
          </div>

        </div>

        <div className="bottom-faq">
          <h1>Frequently Asked Questions</h1>
          <div className="faq-container">
            <div className="faq-item">
              <h3>What is Ariyas?</h3>
              <p>
                Ariyas: Preserving Heritage, Crafting Elegance. Explore premium
                quality traditional goods that celebrate our rich cultural
                heritage. Embrace the essence of tradition with every purchase.
                Unveil the beauty of our heritage at Ariyas - Your Gateway to
                Timeless Elegance.
              </p>
            </div>
            <div className="faq-item">
              <h3>How do I place an order?</h3>
              <p>
                You can place an order by visiting our website and selecting the
                items you want to purchase. Once you have selected the items,
                you can proceed to checkout and make the payment.
              </p>
            </div>
            <div className="faq-item">
              <h3>How can I track my order?</h3>
              <p>
                You can track your order by visiting the &quot;Track Order&quot;
                page on our website and entering your order number. You will be
                able to see the status of your order and the estimated delivery
                date.
              </p>
            </div>
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>
                We accept all major credit and debit cards, as well as PayPal
                and other secure payment methods.
              </p>
            </div>
            <div className="faq-item">
              <h3>How can I contact customer service?</h3>
              <p>
                You can contact our customer service team by emailing us at
                info@ariyas.com or calling us at 123-456-7890. Our team is
                always available to assist you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FAQs;
