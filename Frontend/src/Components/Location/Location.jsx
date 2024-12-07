/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "react-dropdown/style.css";
import "./Location.scss";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { Slider, Typography } from "@mui/material";
import ProductCard from "../Home/ProductCard";
import { getProducts, clearError } from "../../Redux/Actions/productAction";
import NotFound from "../../assets/Images/OtherImages/notofund.png";
import ProductPagination from "../Shop/PaginationComponent/productPagination";
import Meta from "../../Meta";

const Location = ({ match }) => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  const keyword = match.params.keyword;

  const { products, error, loading, productCount, resultPerPage, totalPages } =
    useSelector((state) => state.products);

  const locations = [
    "All",
    "Shantiniketan",
    "Krishnanagar",
    "Jalpaiguri",
    "Siliguri",
    "Darjeeling",
    "Malda",
    "Coochbehar",
    "Kolkata",
    "Maynaguri",
  ];
  
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [price, setPrice] = useState([0, 30000]); // Price range
  const [location, setLocation] = useState("All"); // Location selected
  const [ratings, setRatings] = useState(0); // Ratings
  const [paginationVisible, setPaginationVisible] = useState(true);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
    dispatch(
      getProducts(
        keyword,
        currentPage,
        [newPrice[0], newPrice[1]],
        "",
        location === "All" ? "" : location,
        ratings
      )
    );
  };

  const handleLocationChange = (location) => {
    setLocation(location);
    dispatch(
      getProducts(
        keyword,
        currentPage,
        price,
        "",
        location === "All" ? "" : location,
        ratings
      )
    );
  };

  useEffect(() => {
    dispatch(
      getProducts(
        keyword,
        currentPage,
        price,
        "",
        location === "All" ? "" : location,
        ratings
      )
    );

    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, error, keyword, currentPage, price, location, ratings]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowPriceFilter(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setPaginationVisible(products.length > 0);
  }, [products]);

  return (
    <Fragment>
      <Meta title="Shop From Your Favourite Location" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="shop-section">
            <button
              className="price-filter-button"
              style={{
                left: showPriceFilter ? "-100px" : "0",
                writingMode: "vertical-lr",
                transform: "rotate(180deg)",
              }}
              onClick={() => setShowPriceFilter(!showPriceFilter)}
            >
              {showPriceFilter
                ? "Hide location Filter"
                : "Show location Filter"}
            </button>
            <Typography variant="h3" className="typoH" align="center">
              Shop From Your Favourite Location
            </Typography>

            <div className="products-main-container">
              <div className="products-container">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <div className="not-found-container">
                    <img src={NotFound} className="NotFound" alt="Not Found" />
                    <p className="notfoundText">Products not found</p>
                  </div>
                )}
              </div>
            </div>

            {showPriceFilter && (
              <div ref={containerRef} className="price-filter-container">
                <Typography className="price-header">Price</Typography>
                <Slider
                  className="main-slider"
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={30000}
                />

                <Typography className="location-header">Locations</Typography>
                <ul className="locationBox">
                  {locations.map((locationItem) => (
                    <li
                      className="location-link"
                      key={locationItem}
                      onClick={() => handleLocationChange(locationItem)}
                    >
                      {locationItem}
                    </li>
                  ))}
                </ul>

                <div className="rating-filter">
                  <Typography component="legend" className="rating-header">
                    Ratings
                  </Typography>
                  <Slider
                    className="rating-slider"
                    value={ratings}
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                      dispatch(
                        getProducts(
                          keyword,
                          currentPage,
                          price,
                          "",
                          location === "All" ? "" : location,
                          newRating
                        )
                      );
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                  />
                </div>
              </div>
            )}

            {paginationVisible && (
              <div className="paginationBox">
                <ProductPagination
                  resultPerPage={resultPerPage}
                  productsCount={productCount}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Location.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

export default Location;
