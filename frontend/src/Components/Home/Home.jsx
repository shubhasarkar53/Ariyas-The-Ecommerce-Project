/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from "react";
import "./Home.scss";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../Redux/Actions/productAction";
import Row from "../Row/Row";
import Loader from "../Loader/Loader";
import ImageCarousel from "../Carousel/Carousel";

//import images for carousel
import img from "../../assets/Images/Carousel/AdobeStock_219379270_Preview.jpeg";
import image2 from "../../assets/Images/Carousel/AdobeStock_326340898_Preview.jpeg";
import image3 from "../../assets/Images/Carousel/AdobeStock_596562754_Preview.jpeg";
import image4 from "../../assets/Images/Carousel/AdobeStock_655646740_Preview.jpeg";

const Home = () => {
  const dispatch = useDispatch();
  const { products, error, loading, productCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const images = [
    { url: img, caption: "Ariyas - Discover Local Treasures",link:"/" },
    { url: image2, caption: "Buy & Sell Local Goods",link:"/" },
    { url: image3, caption: "Empower Local Artician's",link:"/" },
    { url: image4, caption: "Start Your Journey Today",link:"/" },
  ];

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="home-container">
          <div className="carousel-container">
            <ImageCarousel images={images} />
          </div>

          <div className="category-container">

            <div className="top-container">
                
            </div>

            <div className="bottom-container"></div>

          </div>

          <div className="product-row-container">
            <Row products={products} loading={loading} error={error} />
            <Row products={products} loading={loading} error={error} />
            <Row products={products} loading={loading} error={error} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
