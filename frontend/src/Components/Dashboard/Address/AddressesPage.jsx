/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import "./Address.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAddress,
  loadAddress,
} from "../../../Redux/Actions/addressAction";
import Loader from "../../Loader/Loader.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Meta from "../../../Meta.jsx";
import { Typography } from "@mui/material";

const AddressesPage = ({ history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAddress());
  }, []);
  // useEffect(() => {
  //   dispatch(loadAddress());
  // }, [dispatch,history]);

  const { addresses, loading } = useSelector((state) => state.addresses);

  const handleDelete = (addressId) => {
    // Dispatch deleteAddress action with the address id
    dispatch(deleteAddress(addressId));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Meta title="Addresses" />
          <ToastContainer />
          <div className="containerAddress">
            <div className="addressesContainer">
              <Typography variant="h3" className="typoH" align="center" style={{ margin: '20px' }}>
                Your Addresses
              </Typography>
              <div className="myAddress-container">
                <Link className="addresses" to={"/new/address"}>
                  <AddIcon className="plusicon" />
                  <p>Add New</p>
                </Link>

                {addresses &&
                  addresses.map((address) => {
                    return (
                      <div className="addresses" key={address._id}>
                        <div className="address">
                          {
                            <div className="address-box">
                              <p>
                                <strong>User:</strong>
                                {address.fullName}
                              </p>
                              <p>
                                <strong>Area:</strong> {address.area}{" "}
                              </p>
                              <p>
                                <strong>Country:</strong> {address.country}{" "}
                              </p>
                              <p>
                                <strong>Flat Name:</strong> {address.flatName}{" "}
                              </p>
                              <p>
                                <strong>Landmark:</strong> {address.landmark}{" "}
                              </p>
                              <p>
                                <strong>Phone Number:</strong> {address.phoneNo}{" "}
                              </p>
                              <p>
                                <strong>Postal Code:</strong>{" "}
                                {address.postalCode}{" "}
                              </p>
                              <p>
                                <strong>Town:</strong> {address.town}{" "}
                              </p>
                              <p>
                                <strong>State:</strong> {address.state}{" "}
                              </p>
                            </div>
                          }
                        </div>
                        <div className="address-btn-container">
                          <Link to={`/address/edit/${address._id}`}>Edit</Link>
                          <button onClick={() => handleDelete(address._id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

AddressesPage.propTypes = {
  history: PropTypes.object,
};

export default AddressesPage;
