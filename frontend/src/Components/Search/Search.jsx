/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import axios from "axios";
import "./Search.scss";
import ProductCard from "../Home/ProductCard";
import { Typography } from "@mui/material";
import Meta from "../../Meta";
const SearchForm = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
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

        <div className="search-res">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <Typography variant="h3" color="error" align="center">
              No products found
            </Typography>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default SearchForm;
