/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import axios from "axios";
import "./Search.scss";
import "./SearchANi.scss";
import ProductCard from "../Home/ProductCard";
import { Typography } from "@mui/material";
import Meta from "../../Meta";

const SearchForm = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [products, setProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const handleSearch = async () => {
    if (!keyword && !location) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Hide the toast after 3 seconds
      return;
    }

    try {
      const response = await axios.get("/api/v1/products", {
        params: {
          keyword,
          location,
        },
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <Fragment>
      <Meta title="Search" />

      <div className="search_topdiv">
        <Typography variant="h3" className="typoH" align="center">
          Search Products
        </Typography>
        <div className="input_container">
          <input
            type="text"
            placeholder="Search by name"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {showToast && (
          <div className="toast">
            Please enter your query on input field first
          </div>
        )}

        {products.length > 0 ? (
          <div className="search-res">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="containerCube">
            <div className="h1Container">
              <div className="cube h1 w1 l1">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h1 w1 l2">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h1 w1 l3">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h1 w2 l1">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h1 w2 l2">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h1 w2 l3">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h1 w3 l1">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h1 w3 l2">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h1 w3 l3">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>
            </div>

            <div className="h2Container">
              <div className="cube h2 w1 l1">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h2 w1 l2">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h2 w1 l3">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h2 w2 l1">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h2 w2 l2">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h2 w2 l3">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h2 w3 l1">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h2 w3 l2">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h2 w3 l3">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>
            </div>

            <div className="h3Container">
              <div className="cube h3 w1 l1">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h3 w1 l2">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h3 w1 l3">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h3 w2 l1">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h3 w2 l2">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h3 w2 l3">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h3 w3 l1">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h3 w3 l2">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h3 w3 l3">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>
            </div>
          </div>
        )}

        {/* <div className="search-res">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="containerCube">
            <div className="h1Container">
              <div className="cube h1 w1 l1">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h1 w1 l2">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h1 w1 l3">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h1 w2 l1">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h1 w2 l2">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h1 w2 l3">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h1 w3 l1">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h1 w3 l2">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h1 w3 l3">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>
            </div>

            <div className="h2Container">
              <div className="cube h2 w1 l1">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h2 w1 l2">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h2 w1 l3">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h2 w2 l1">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h2 w2 l2">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h2 w2 l3">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h2 w3 l1">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h2 w3 l2">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h2 w3 l3">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>
            </div>

            <div className="h3Container">
              <div className="cube h3 w1 l1">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h3 w1 l2">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h3 w1 l3">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h3 w2 l1">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h3 w2 l2">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h3 w2 l3">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h3 w3 l1">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h3 w3 l2">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>

              <div className="cube h3 w3 l3">
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>
            </div>
          </div>
          )}
        </div> */}
      </div>
    </Fragment>
  );
};

export default SearchForm;
