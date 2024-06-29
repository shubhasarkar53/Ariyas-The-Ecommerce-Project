/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewAddress, loadAddress } from "../../../Redux/Actions/addressAction";
import { useHistory } from "react-router-dom";
import "./NewAddress.scss";
import { toast } from 'react-toastify';
import Meta from "../../../Meta";
const NewAddress = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [addresses, setAddresses] = React.useState({
    country: "India",
    fullName: "",
    address: "",
    phoneNo: "",
    postalCode: "",
    flatName: "",
    area: "",
    landmark: "",
    town: "",
    state: "West Bengal",
  });

  const [isLoading, setIsLoading] = useState(false);

  const {
    fullName,
    address,
    town,
    phoneNo,
    flatName,
    area,
    landmark,
    postalCode,
    country,
    state,
  } = addresses;

  function handleNewAddChange(e) {
    setAddresses((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  // function handleNewAddSubmit(e) {
  //   e.preventDefault();
  //   console.log("Form Submitted!");
  //   // setAddresses((prevState)=>[
  //   //   ...prevState,
  //   //   {...addresses},
  //   // ])

  //   // console.log(addresses);

  //   const addressData = new FormData();

  //   addressData.set("fullName", fullName);
  //   // addressData.set("address", address);
  //   addressData.set("town", town);
  //   addressData.set("phoneNo", phoneNo);
  //   addressData.set("flatName", flatName);
  //   addressData.set("area", area);
  //   addressData.set("landmark", landmark);
  //   addressData.set("postalCode", postalCode);
  //   addressData.set("country", country);
  //   addressData.set("state", state);

  //   // addressData.forEach((item)=>console.log(item))
  //   dispatch(addNewAddress(addressData));
  //   history.push("/addresses");

  // }
  // function handleNewAddSubmit(e) {
  //   e.preventDefault();
  //   const requiredFields = ['fullName', 'phoneNo', 'postalCode', 'flatName', 'area', 'landmark', 'town'];
  //   const emptyFields = requiredFields.filter(field => !addresses[field]);

  //   if (emptyFields.length > 0) {
  //     emptyFields.forEach(field => {
  //       toast.error(`${field} is required`);
  //       alert(`${field} is required`);
  //     });
  //     return;
  //   }

  //   setIsLoading(true);

  //   const addressData = new FormData();

  //   addressData.set("fullName", fullName);
  //   addressData.set("town", town);
  //   addressData.set("phoneNo", phoneNo);
  //   addressData.set("flatName", flatName);
  //   addressData.set("area", area);
  //   addressData.set("landmark", landmark);
  //   addressData.set("postalCode", postalCode);
  //   addressData.set("country", country);
  //   addressData.set("state", state);

  //   dispatch(addNewAddress(addressData))
  //     .then(() => {
  //       setIsLoading(false); // Reset loading state after successful form submission
  //       history.push("/addresses");
  //     })
  //     .catch((error) => {
  //       setIsLoading(false); // Reset loading state if form submission fails
  //       console.error("Error submitting form:", error);
  //     });
  // }

  function handleNewAddSubmit(e) {
    e.preventDefault();
    const requiredFields = ['fullName', 'phoneNo', 'postalCode', 'flatName', 'area', 'landmark', 'town'];
    const emptyFields = requiredFields.filter(field => !addresses[field]);

    if (emptyFields.length > 0) {
      emptyFields.forEach(field => {
        toast.error(`${field} is required`);
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const addressData = new FormData();

      addressData.set("fullName", fullName);
      addressData.set("address", address);
      addressData.set("town", town);
      addressData.set("phoneNo", phoneNo);
      addressData.set("flatName", flatName);
      addressData.set("area", area);
      addressData.set("landmark", landmark);
      addressData.set("postalCode", postalCode);
      addressData.set("country", country);
      addressData.set("state", state);
      dispatch(addNewAddress(addressData))
        .then(() => {
          setIsLoading(false);
          history.push("/addresses");
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error submitting form:", error);
        });
    }, 2500);
  }



  return (
    <>
    <Meta title="New Address" />
      <div className="new-address-container">
        <h1>Add a New Address</h1>
        <div className="form-container">
          <form className="newAddressForm" onSubmit={handleNewAddSubmit}>
            <div className="newAddressForm-input-fields">
              <label htmlFor="country">Country/Region</label>
              <select
                name="country"
                id="country"
                disabled="disabled"
                value={country}
                onChange={handleNewAddChange}
              >
                <option value="India">India</option>
              </select>

              <label htmlFor="fullName">Full name</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={fullName}
                onChange={handleNewAddChange}
                placeholder="Full Name"
              />
              <label htmlFor="phoneNo">Mobile number</label>
              <input
                type="number"
                name="phoneNo"
                id="phoneNo"
                value={phoneNo}
                onChange={handleNewAddChange}
                placeholder="Phone Number"
              />

              <label htmlFor="postalCode">Pincode</label>
              <input
                type="number"
                name="postalCode"
                id="postalCode"
                value={postalCode}
                onChange={handleNewAddChange}
                placeholder="Area Pincode"
              />

              <label htmlFor="flatName">
                Flat, House no., Building, Company, Apartment
              </label>
              <input
                type="text"
                name="flatName"
                id="flatName"
                value={flatName}
                onChange={handleNewAddChange}
              />

              <label htmlFor="area">Area, Street, Sector, Village</label>
              <input
                type="text"
                name="area"
                id="area"
                value={area}
                onChange={handleNewAddChange}
              />

              <label htmlFor="landmark">Landmark</label>
              <input
                type="text"
                name="landmark"
                id="landmark"
                value={landmark}
                onChange={handleNewAddChange}
              />

              <label htmlFor="town">Town/City</label>
              <input
                type="text"
                name="town"
                id="town"
                value={town}
                onChange={handleNewAddChange}
              />
              <label htmlFor="town">State</label>
              <select
                name="state"
                id="state"
                disabled="disabled"
                value={state}
                onChange={handleNewAddChange}
              >
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="loader">
                  <h3>Submitting</h3>
                  <div className="dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewAddress;
