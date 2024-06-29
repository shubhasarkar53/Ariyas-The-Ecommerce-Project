/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import "./Home.scss";
import { useSelector, useDispatch } from "react-redux";
import { getProductswp } from "../../Redux/Actions/productAction";
import Loader from "../Loader/Loader";
import ImageCarousel from "../Carousel/Carousel";
import Meta from "../../Meta";

// Import images for carousel
import img from "../../assets/Images/Carousel/bg.jpg";
import image2 from "../../assets/Images/Carousel/bg2final.jpg";
import image3 from "../../assets/Images/Carousel/bg3final.jpg";

// Import other images
import Logo from "../../assets/Images/Home/all_logo.png";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

import "./HomeResponsive.scss";

const Home = () => {
  const dispatch = useDispatch();
  const { products, error, loading, productCount, category } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProductswp());
  }, [dispatch]);

  // Images, titles and captions for carousel
  const images = [
    {
      url: img,
      title: "Ariyas - Discover Local Treasures",
      caption: "Preserving Heritage, Crafting Elegance. Explore premium quality traditional goods that celebrate our rich cultural heritage. Embrace the essence of tradition with every purchase. Unveil the beauty of our heritage at Ariyas - Your Gateway to Timeless Elegance.",
      link: "/shop",
    },
    {
      url: image2,
      title: "Ariyas - Discover Local Treasures",
      caption: "Buy & Sell Local Goods",
      link: "/shop",
    },
    {
      url: image3,
      title: "Ariyas - Discover Local Treasures",
      caption: "Empower Local Artician's",
      link: "/shop",
    },
  ];
  const [loadingButton, setLoadingButton] = useState(null);

  const handleButtonClick = async (buttonClass) => {
    if (loadingButton) {
      return;
    }
    setLoadingButton(buttonClass);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoadingButton(null);
    setTimeout(() => {
      window.location.href = "/shop";
    }, 1500);
  };

  // Function to group products by category
  const groupProductsByCategory = (products) => {
    return products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});
  };

  const groupedProducts = groupProductsByCategory(products);

  return (
    <Fragment>
      <Meta
        title="Home | Ariyas"
        description="Welcome to Ariyas, we offer the best Handcrafted from local articians at affordable prices"
        keywords="home, products, affordable,handcrafted,sharee,shoes,wooden,ceramic"
      />
      {loading ? (
        <Loader />
      ) : (
        <div className="home-container">
          <div className="carousel-container">
            <ImageCarousel images={images} />
          </div>

          <div className="logo-container">
            <img src={Logo} alt="logo" className="logo" />
          </div>

          <div className="category-container">
            <div className="top-container">
              <div className="top1">
                <p className="top1-text">HandMade Bags</p>
                <button
                  className={`top1-button ${loadingButton === "top1" ? "loading" : ""
                    }`}
                  onClick={() => handleButtonClick("top1")}
                >
                  Bags
                </button>
              </div>

              <div className="top2">
                <p className="top2-text">Hand-Loom Sarees</p>
                <button
                  className={`top2-button ${loadingButton === "top2" ? "loading" : ""
                    }`}
                  onClick={() => handleButtonClick("top2")}
                >
                  Sarees
                </button>
              </div>
            </div>

            <div className="bottom-container">
              <div className="bottom1">
                <p className="bottom1-text">Woodcrafted Items</p>
                <button
                  className={`bottom1-button ${loadingButton === "bottom1" ? "loading" : ""
                    }`}
                  onClick={() => handleButtonClick("bottom1")}
                >
                  Woodcrafts
                </button>
              </div>

              <div className="bottom2">
                <p className="bottom2-text">Clay-Made Items</p>
                <button
                  className={`bottom2-button ${loadingButton === "bottom2" ? "loading" : ""
                    }`}
                  onClick={() => handleButtonClick("bottom2")}
                >
                  Clay-made
                </button>
              </div>
            </div>
          </div>

          <div className="product-row-container">
            {Object.keys(groupedProducts).map((category, index) => (
              <div className="row" key={index}>
                <h1>{category} Item&apos;s</h1>
                <div className="row-products">
                  {groupedProducts[category].slice(0, 4).map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="explore-more-section">
            <div className="explore">
              <div className="explore-title">
                <h2>Explore more</h2>
                <h3>
                  Explore and enrich the cultural heritage of our Indian
                  civilization.
                </h3>
                <p>
                  Explore our meticulously curated collection of traditional
                  goods, each crafted with precision and imbued with centuries
                  of heritage. From exquisite handloom sarees to intricately
                  carved wooden artifacts, Ariyas showcases the finest
                  craftsmanship India has to offer.
                </p>
                <div className="btn-explore">
                  <Link to="/shop">
                    <button>Bags</button>
                  </Link>
                  <Link to="/shop">
                    <button>Sarees</button>
                  </Link>
                  <Link to="/shop">
                    <button>Wooden Items</button>
                  </Link>
                  <Link to="/shop">
                    <button>Clay Products</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
