/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./Location.scss";
import { FaLocationCrosshairs } from "react-icons/fa6";
const Location = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const options = ["Santiniketan","Krishnanagar","Jalpaiguri","Siliguri"];

  const handleDropdownChange = (option) => {
    setSelectedOption(option);
  };

  const searchSubmithandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };
  return (
    <Fragment>
      <div className="main_container">
        <h1>Find Local Treasures Products From Location</h1>
        <div className="sub-container">
          <div className="sub-top">
            <form className="search-form" onSubmit={searchSubmithandler}>
              <input
                value={keyword}
                className="search-input"
                type="text"
                id="search"
                placeholder="Find Products From the Places You Want"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <input className="search-button" type="submit" value="Search" />
            </form>
            <div className="loc">
              <FaLocationCrosshairs  className="loc-img"/>
              <p className="loc_text">Fetch Your Current Location</p>
            </div>
          </div>
          <div className="sub-down">
            <Dropdown
              options={options}
              onChange={handleDropdownChange}
              value={selectedOption}
              placeholder="West Bengal"
              className="custom-dropdown"
              controlClassName="custom-dropdown-control"
              menuClassName="custom-dropdown-menu"
              arrowClassName="custom-dropdown-arrow"
            />
            {selectedOption && <p>You selected: {selectedOption.value}</p>}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Location.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Location;
