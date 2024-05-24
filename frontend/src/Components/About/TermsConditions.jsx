/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './TermsConditions.scss'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader';
import Meta from '../../Meta'
const TermsConditions = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Meta title="Terms & Conditions" />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="terms-conditions-container">
          <div className="terms-conditions">
            <h2 className="terms-title">
              Terms & Conditions of Service
            </h2>
            <div className="title-bar"></div>
            <div className="terms-para">
              <p className="intro-terms">
                Welcome to Ariyas E-commerce! These Terms and Conditions (`Terms`) govern your use of our website, operated by Ariyas, a collective effort by a team of dedicated individuals passionate about promoting traditional Indian or Swadeshi products, supporting local artisans, and popularizing Indian goods. By accessing or using our website, you agree to be bound by these Terms. Please read them carefully before proceeding.
              </p>
              <span className="terms-span-title">1. Acceptance of Terms</span>

              <p className="term-details-para">By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our website.</p>

              <span className="terms-span-title">2. Description of Service</span>

              <p className="term-details-para">Ariyas is an e-commerce platform aimed at providing a marketplace where consumers can discover and purchase authentic Indian products directly from artisans and local producers. Our mission is to showcase the rich heritage of Indian craftsmanship and promote products with Geographic Indication (GI) tags.</p>

              <span className="terms-span-title">3. Registration and Account</span>

              <p className="term-details-para">To access certain features of our website, you may be required to create an account. By registering, you agree to provide accurate, current, and complete information about yourself. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.</p>

              <span className="terms-span-title">4. Product Listings and Purchases</span>

              <p className="term-details-para">We offer a diverse range of traditional Indian products sourced from local artisans and producers. Product listings on our website are subject to availability and may change without notice. By purchasing products through our website, you agree to abide by any additional terms and conditions provided by the seller.</p>

              <span className="terms-span-title">5. Payment</span>

              <p className="term-details-para">Payment for purchases made on our website must be made through the designated payment methods provided at the time of purchase. You agree to pay all fees and charges associated with your purchases in accordance with the pricing and payment terms in effect at the time of purchase.</p>

              <span className="terms-span-title">6. Shipping and Delivery</span>

              <p className="term-details-para">Shipping and delivery of products purchased on our website will be subject to the shipping policies of the respective sellers. While we facilitate the shipping process, we do not assume responsibility for delays, damages, or other issues arising during shipping and delivery.</p>

              <span className="terms-span-title">7. Returns and Refunds</span>

              <p className="term-details-para">Returns and refunds for products purchased on our website will be subject to the return policies of the respective sellers. We will facilitate the return process but do not guarantee refunds for products returned in accordance with the seller's policies.</p>

              <span className="terms-span-title">8. Intellectual Property</span>

              <p className="term-details-para">All content provided on our website, including text, graphics, logos, images, and software, is the property of Ariyas or its licensors and is protected by copyright, trademark, and other intellectual property laws. You agree not to reproduce, distribute, modify, or create derivative works of any content without our express written consent.</p>

              <span className="terms-span-title">9. Limitation of Liability</span>

              <p className="term-details-para">In no event shall Ariyas, its officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of our website or any products purchased through our website.</p>

              <span className="terms-span-title">10. Governing Law</span>

              <p className="term-details-para">These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these Terms or your use of our website shall be subject to the exclusive jurisdiction of the courts located in [insert jurisdiction].</p>

              <span className="terms-span-title">11. Amendments</span>

              <p className="term-details-para">We reserve the right to amend these Terms at any time without notice. Your continued use of our website following any such amendments constitutes your acceptance of the revised Terms.</p>

              <span className="terms-span-title">12. Contact Information</span>

              <p className="term-details-para">If you have any questions or concerns about these Terms, please contact us at ariyas69@gmail.com</p>

            </div>
            <h3>Thank you for supporting Ariyas E-commerce!</h3>
            <div className="btn-back">
              <Link to="/about">
                <button>Go Back</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TermsConditions