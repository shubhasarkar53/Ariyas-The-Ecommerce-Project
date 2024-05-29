/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './About.scss';
import aboutImage from '../../assets/Images/Carousel/AdobeStock_313642757_Preview.jpeg'
import aboutImg1 from '../../assets/Images/Carousel/AdobeStock_500191794_Preview.jpeg';
// import { useSelector } from 'react-redux';
import './AboutAnimation.scss';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import Meta from "../../Meta";
import TeamSection from './TeamSection';

const About = () => {
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
      {loading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="about-container">
          <Meta title="About Us" />
          <div className="first-part">
            <div className="image-section">
              <img src={aboutImage} alt="about image" />
            </div>
            <div className="text-title-section">
              <span>ABOUT US</span>
              <h2>Welcome to Ariyas</h2>
              <p>At Ariyas we take pride in showcasing the unique products and foods that make each place special. Our platform connects  local sellers with buyers; promoting local entrepreneurshiop and preserving local culture. Discover local treasures only at Ariyas.</p>
              <Link to="/terms-conditions">
                <button className='btn-about_'>Read more</button>
              </Link>
            </div>
          </div>
          <div className="second-part">
            <h2>Why choose Ariyas?</h2>
            <div className="para">
              <p>Choose Ariyas for a vibrant shopping experience that champions local businesses and entrepreneurship. We are committed to fostering community growth and supporting the unique offerings of local entrepreneurs, making your shopping not just a transaction but a positive impact on local economies</p>
            </div>
            <div className="sub-second-part">
              <div className="left-part">
                <div className="left-part-div">
                  <span>01</span>
                  <h3>Handmade Leather Bags</h3>
                  <p>Discover the artistry of our local craftsmen through our exclusive collection of handmade bags. Each piece is a testament to skill, passion, and a rich cultural heritage. By choosing our handmade bags, you not only embrace the charm of unique.</p>
                </div>
                <div className="left-part-div">
                  <span>02</span>
                  <h3>Sarees</h3>
                  <p>Indulge in timeless elegance with our exquisite collection of sarees. Woven with precision and adorned with intricate details, our sarees showcase the craftsmanship of local weavers. From traditional classics to contemporary styles, each saree tells a story of heritage and artistry.</p>
                </div>
              </div>
              <div className="right-part">
                <div className="right-part-div">
                  <span>03</span>
                  <h3>Colorful Pulses and Seed Jewellery</h3>
                  <p>Dress up your style with our vibrant collection of Colorful Pulses and Seeds jewelry. Handcrafted with precision and passion, each piece showcases the natural beauty and versatility of pulses and seeds. </p>
                </div>
                <div className="right-part-div">
                  <span>04</span>
                  <h3>Other Handmade Crafts</h3>
                  <p>Explore the world of creativity with our diverse range of handmade crafts. From intricately designed home decor to personalized accessories, each item is a unique expression of craftsmanship and individuality.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="third-part">
            <div className="para--about">
              <p>When you choose Ariyas, you are choosing a vibrant marketplace where the heartbeat is the passion of local craftsmen, artisans, and entrepreneurs. Our commitment lies in curating products that not only meet your desires but also narrate stories of skill, culture, and sustainability.</p>
            </div>
            <div className="image--about">

              <img src={aboutImg1} alt="Image about" />
            </div>
          </div>

          {/* //team members container */}
          <TeamSection />
        </div>
      )}
    </>
  )
}

export default About