/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import userImg from "../../assets/Images/Icons/profile icons/userImg.png";
import profileSide from "../../assets/Images/Icons/profile icons/pngwing 3.png";
import ordersImg from "../../assets/Images/Icons/profile icons/ordersImg.png";
import cartImg from "../../assets/Images/Icons/profile icons/cart.png";
import wishlistImg from "../../assets/Images/Icons/profile icons/wishlist.png";
import contactImg from "../../assets/Images/Icons/profile icons/contact.png";
import loginImg from "../../assets/Images/Icons/profile icons/security.png";
import paymentImg from "../../assets/Images/Icons/profile icons/payment.png";
import addressImg from "../../assets/Images/Icons/profile icons/address.png";
import logoutImg from "../../assets/Images/Icons/profile icons/logout.png";
import adminImg from "../../assets/Images/Icons/profile icons/admin.png";
import { connect, useDispatch, useSelector } from "react-redux";
import { loadUser, logOut } from "../../Redux/Actions/userAction.js";
import "./Profile.scss";
import Loader from "../Loader/Loader.jsx";
import { Link, useHistory } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearCart } from "../../Redux/Actions/cartAction.js";
import Meta from "../../Meta.jsx"
import { Typography } from "@mui/material";

const Profile = () => {
  const [loadingDelay, setLoadingDelay] = useState(false);
  const { user, loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const fileInputRef = useRef(null);

  const handleEditIconClick = () => {
    fileInputRef.current.click();
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const options = [
    {
      icon: ordersImg,
      title: "Your Orders",
      text: "Manage and view your orders",
      func: manageOrders,
    },
    {
      icon: cartImg,
      title: "Cart Items",
      text: "Manage and view your cart",
      func: manageCarts,
    },
    {
      icon: wishlistImg,
      title: "Your Wishlist",
      text: "Manage and view your wishlist",
      func: manageWishlist,
    },
    {
      icon: contactImg,
      title: "Contact Us",
      text: "Help Center",
      func: manageContact,
    },
    {
      icon: loginImg,
      title: "Login & Security",
      text: "Edit your Login credentials",
      func: updateCredentials,
    },
    {
      icon: paymentImg,
      title: "Payment Methods",
      text: "Manage and view your payment settings",
      func: managePaymentMethod,
    },
    {
      icon: addressImg,
      title: "Your Address",
      text: "Edit, add or remove your address",
      func: manageAddress,
    },
    {
      icon: logoutImg,
      title: "Logout",
      text: "Logout from Ariyas",
      func: managelogOut,
    },
  ];
  if (user.role === "admin" || user.role === "seller") {
    options.unshift({
      icon: adminImg,
      title: `${user.role} Dashboard`,
      text: `Manage your ${user.role} profile`,
      func: manageAdminProfile,
    });
  }

  // function definitions
  function manageOrders() {
    history.push("/orders/me");
  }
  function manageCarts() {
    history.push("/cart");
  }
  function manageWishlist() {
    history.push("/wishlist");
  }
  function manageContact() {
    history.push("/contact");
  }
  function updateCredentials() {
    history.push("/password/update");
  }
  function managePaymentMethod() {
    history.push("/payments");
  }
  function manageAddress() {
    history.push("/addresses");
  }
  function managelogOut() {
    dispatch(logOut());
    // dispatch(clearCart());
    // console.log("logged out");
    // console.log("loggedout");
  }
  function manageAdminProfile() {
    history.push("/admin");
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Meta title={`My Profile - ${user?.name}`} />
          <div className="profile-container">
            <div className="profile-title">
            <Typography variant="h3" className="typoH" align="center">
              My Profile
            </Typography>
            </div>
            <div className="profile-det-container">
              <ToastContainer />
              {/* Left side of the profile */}
              <div className="ext-left-profile">
                <img src={profileSide} alt="Background Image" />
              </div>
              {/* Main Profile details */}
              <div className="main-profile">
                <div className="main-profile-container">
                  <div className="main-profile-container-left">
                    <div className="img-profile">
                      <img src={user?.avatar?.url} alt="My Image" />
                    </div>
                    <div className="main-profile-det">
                      <div className="profile-name">
                        <p>
                          {user && user.name} (<strong>{user.role}</strong>)
                        </p>
                      </div>
                      <div className="profile-email">
                        <p>{user && user.email}</p>
                      </div>
                    </div>
                  </div>
                  {/* <div className="main-profile-container-right">
                    <input type="file" name="avatar" accept="image/*" />
                  </div> */}

                  <div className="main-profile-container-right">
                    {/* Hidden file input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      name="avatar"
                      accept="image/*"
                      style={{ display: "none" }}
                    />

                    {/* Edit icon */}
                    <Link to={"/me/update/profile"}>
                      <Tooltip title="Edit Profile">
                        <label>
                          <EditIcon />
                        </label>
                      </Tooltip>
                    </Link>
                  </div>
                </div>
                {/* All the actions that the profile section provides to the user */}
                <div className="profile-actions-slot">
                  {options.map((item, index) => {
                    return (
                      <div
                        className="profile-slot"
                        key={index}
                        onClick={item.func}>
                        <div className="img-action">
                          <img src={item.icon} alt={item.title} />
                        </div>
                        <div className="title-action">
                          <h4>{item.title}</h4>
                          <p>{item.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right side of the profile */}
              <div className="ext-right-profile">
                <img src={profileSide} alt="Background Image" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
