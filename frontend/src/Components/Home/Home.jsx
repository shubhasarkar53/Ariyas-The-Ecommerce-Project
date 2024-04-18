/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import "./Home.scss";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../Redux/Actions/productAction";
import Loader from "../Loader/Loader";
import ImageCarousel from "../Carousel/Carousel";

//import images for carousel
import img from "../../assets/Images/Carousel/AdobeStock_219379270_Preview.jpeg";
import image2 from "../../assets/Images/Carousel/AdobeStock_326340898_Preview.jpeg";
import image3 from "../../assets/Images/Carousel/AdobeStock_596562754_Preview.jpeg";
import image4 from "../../assets/Images/Carousel/AdobeStock_655646740_Preview.jpeg";

//import other images
import Logo from "../../assets/Images/Home/all_logo.png";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { products, error, loading, productCount, category } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


  //images, titles and captions for carousel
  const images = [
    {
      url: img,
      title: "Ariyas - Discover Local Treasures",
      caption: "Products With GI Tag's",
      link: "/",
    },
    {
      url: image2,
      title: "Ariyas - Discover Local Treasures",
      caption: "Buy & Sell Local Goods",
      link: "/",
    },
    {
      url: image3,
      title: "Ariyas - Discover Local Treasures",
      caption: "Empower Local Artician's",
      link: "/",
    },
    {
      url: image4,
      title: "Ariyas - Discover Local Treasures",
      caption: "Start Your Journey Today",
      link: "/",
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

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="home-container">
          <div className="carousel-container">
            <ImageCarousel images={images} />
          </div>

          <div className="logo-container">
            {" "}
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
            {products && products.length > 0 && (
              <div className="row">
                <h1>{products[0] && products[0].category} Item&apos;s</h1>
                <div className="row-products">
                  {products.slice(0, 4).map((product) => {
                    return <ProductCard key={product._id} product={product} products={products} />;
                  })}
                </div>
              </div>
            )}

            {products && products.length > 0 && (
              <div className="row">
                <h1>{products[4] && products[4].category} Item&apos;s</h1>
                <div className="row-products">
                  {products.slice(4, 8).map((product) => {
                    return <ProductCard key={product._id} product={product} />;
                  })}
                </div>
              </div>
            )}

            {products && products.length > 0 && (
              <div className="row">
                <h1>{products[8] && products[8].category} Item&apos;s</h1>
                <div className="row-products">
                  {products.slice(8, 12).map((product) => {
                    return <ProductCard key={product._id} product={product} />;
                  })}
                </div>
              </div>
            )}

            {/* unable to fetch */}
            {/* {products && products.length > 0 && (
              <div className="row">
                <h1>{products[12] && products[12].category} Item&apos;s</h1>
                <div className="row-products">
                  {products.slice(12, 16).map((product) => {
                    return <ProductCard key={product._id} product={product} />;
                  })}
                </div>
              </div>
            )} */}
          </div>
          <div className="explore-more-section">
            <div className="explore">
              <div className="explore-title">
                <h2>Explore more</h2>
                <h3>Explore and enrich the cultural heritage of our Indian civilization.</h3>
                <p>Explore our meticulously curated collection of traditional goods, each crafted with precision and imbued with centuries of heritage. From exquisite handloom sarees to intricately carved wooden artifacts, Ariyas showcases the finest craftsmanship India has to offer.</p>
                <div className="btn-explore">
                  <Link to="/shop"><button>Bags</button></Link>
                  <Link to="/shop"><button>Sarees</button></Link>
                  <Link to="/shop"><button>Wooden Items</button></Link>
                  <Link to="/shop"><button>Clay Products</button></Link>
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
