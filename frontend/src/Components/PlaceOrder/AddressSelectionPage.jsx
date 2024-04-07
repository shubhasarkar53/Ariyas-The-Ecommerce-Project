/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import { addNewAddress } from "../../Redux/Actions/addressAction";
import { saveShippingInfo } from "../../Redux/Actions/cartAction";

import {
  deleteAddress,
  loadAddress,
} from "../../Redux/Actions/addressAction";
import "./AddressSelectionPage.scss";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CheckoutSteps from "../Cart/CheckoutSteps";
const AddressSelectionPage = ({ history }) => {

  const dispatch = useDispatch();

  const { addresses, loading } = useSelector((state) => state.addresses);
  const { shippingInfo } = useSelector((state) => state.cart);

  const [selectedAddressId, setSelectedAddressId] = useState( shippingInfo.address);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  useEffect(() => {
    dispatch(loadAddress());
  }, [dispatch, history]);

  // const handleAddAddress = () => {
  //   setShowAddAddressForm(true);
  // };

  const handleDelete = (addressId) => {
    // Dispatch deleteAddress action with the address id
    dispatch(deleteAddress(addressId));
  };

  const handleSelectAddress = (addressId) => {
    // Check if the address is already selected
    if (selectedAddressId === addressId) {
      return;
    }
    // Dispatch saveShippingInfo action with the selected address id
    dispatch(saveShippingInfo({ address: addressId, saveAddress: true }));
    setSelectedAddressId(addressId);
  };

const addressSubmitHandler = (e) => {
  // Prevent default form submission
  e.preventDefault();
  // Dispatch saveShippingInfo action with the selected address id
  dispatch(saveShippingInfo({ address: selectedAddressId }));
  history.push("/order/confirm");
};
  
  return (
    <Fragment>
      <CheckoutSteps activeStep={0}/>
      {loading ? (
        <Loader />
      ) : addresses && addresses.length === 0 ? (
        <div className="address">
          <p>No address found. Please add a new address.</p>
          <Link to="/new/address">
            <AddIcon className="plusicon" />
            <p>Add New</p>
          </Link>
        </div>
      ) : (
        <>
         
          {addresses &&
                  addresses.map((address) => {
                    return (
                      <div className="addresses" key={address._id}>
                        <div className="address">
                          <input
                            type="radio"
                            name="address"
                            id={address._id}
                            value={address._id}
                            checked={selectedAddressId === address._id}
                            onChange={() => handleSelectAddress(address._id)}
                          />
                          <label htmlFor={address._id}>
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
                          </label>
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
          <button onClick={ addressSubmitHandler} className="address-btn">Continue to Payment</button>
          <ToastContainer />
        </>
      )}
    </Fragment>
  );
};

AddressSelectionPage.propTypes = {
  history: PropTypes.object,
};

export default AddressSelectionPage;
