/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { editAddress, loadAddress } from "../../../Redux/Actions/addressAction";
import { clearError } from "../../../Redux/Actions/userAction";
import { EDIT_USER_ADDRESS_RESET } from "../../../Redux/Constants/addressConstants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Address.scss";
import Meta from "../../../Meta";

const EditAddressPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [addresses, setAddresses] = React.useState({
    fullName: "",
    phoneNo: "",
    postalCode: "",
    flatName: "",
    area: "",
    landmark: "",
    town: "",
  });

  const { fullName, town, phoneNo, flatName, area, landmark, postalCode } =
    addresses;

  function handleUpdateAddChange(e) {
    setAddresses((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleUpdateAddSubmit(e) {
    e.preventDefault();
    console.log("Form Submitted!");

    const addressData = new FormData();

    addressData.set("fullName", fullName);
    addressData.set("town", town);
    addressData.set("phoneNo", phoneNo);
    addressData.set("flatName", flatName);
    addressData.set("area", area);
    addressData.set("landmark", landmark);
    addressData.set("postalCode", postalCode);

    // addressData.forEach((item)=>console.log(item))
    dispatch(editAddress(id, addressData));
    // history.push("/addresses");
  }

  const { loading, isEdited, error } = useSelector((state) => state.addresses);
  const address = useSelector((state) =>
    state.addresses.addresses.find((addr) => addr._id === id)
  );
  //  console.log(address)

  useEffect(() => {
    if (id && address) {
      setAddresses({
        fullName: address.fullName,
        phoneNo: address.phoneNo,
        postalCode: address.postalCode,
        flatName: address.flatName,
        area: address.area,
        landmark: address.landmark,
        town: address.town,
      });
    }
    if (error) {
      // some toast
      toast.error(error, {
        position: "bottom-center",
        autoClose: 3000,
      });
      console.log("useeffect:", error);
      dispatch(clearError());
    }

    if (isEdited) {
      // some tost upatded successfully
      toast.success("Address Updated Successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      // console.log("upatded successfully");
      dispatch(loadAddress());
      history.push("/addresses");

      dispatch({ type: EDIT_USER_ADDRESS_RESET });
    }
  }, [dispatch, error, history, isEdited]);

  return (
    <Fragment>
      <Meta title="Edit Addresse" />

      <div className="new-address-container">
        <h2>Edit Address</h2>
        <div className="form-container">
          <form className="newAddressForm" onSubmit={handleUpdateAddSubmit}>
            <div className="newAddressForm-input-fields">
              <label htmlFor="fullName">Full name (First and Last name)</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={fullName}
                onChange={handleUpdateAddChange}
                placeholder="Full Name"
              />
              <label htmlFor="phoneNo">Mobile number</label>
              <input
                type="number"
                name="phoneNo"
                id="phoneNo"
                value={phoneNo}
                onChange={handleUpdateAddChange}
                placeholder="Phone Number"
              />

              <label htmlFor="postalCode">Pincode</label>
              <input
                type="number"
                name="postalCode"
                id="postalCode"
                value={postalCode}
                onChange={handleUpdateAddChange}
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
                onChange={handleUpdateAddChange}
              />

              <label htmlFor="area">Area, Street, Sector, Village</label>
              <input
                type="text"
                name="area"
                id="area"
                value={area}
                onChange={handleUpdateAddChange}
              />

              <label htmlFor="landmark">Landmark</label>
              <input
                type="text"
                name="landmark"
                id="landmark"
                value={landmark}
                onChange={handleUpdateAddChange}
              />

              <label htmlFor="town">Town/City</label>
              <input
                type="text"
                name="town"
                id="town"
                value={town}
                onChange={handleUpdateAddChange}
              />
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default EditAddressPage;
