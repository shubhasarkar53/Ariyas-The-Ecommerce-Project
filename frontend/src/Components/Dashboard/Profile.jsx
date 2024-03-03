/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import userImg from '../../assets/Images/Icons/profile icons/userImg.png';
import profileSide from '../../assets/Images/Icons/profile icons/pngwing 3.png';
import ordersImg from '../../assets/Images/Icons/profile icons/ordersImg.png';
import cartImg from '../../assets/Images/Icons/profile icons/cart.png';
import wishlistImg from '../../assets/Images/Icons/profile icons/wishlist.png';
import contactImg from '../../assets/Images/Icons/profile icons/contact.png';
import loginImg from '../../assets/Images/Icons/profile icons/security.png';
import paymentImg from '../../assets/Images/Icons/profile icons/payment.png';
import addressImg from '../../assets/Images/Icons/profile icons/address.png';
import logoutImg from '../../assets/Images/Icons/profile icons/logout.png';
// import adminImg from '../../assets/Images/Icons/profile icons/admin.png';
import { connect } from 'react-redux';
import { loadUser } from '../../Redux/Actions/userAction.js';
import './Profile.scss';

const Profile = ({ user, loadUser }) => {
  useEffect(() => {
    // Load user data when the component mounts
    loadUser();
  }, [loadUser]);

  return (
    <>
      <div className="profile-container">
        <div className="profile-title">
          <h2>My Profile</h2>
        </div>
        <div className="profile-det-container">

          {/* Left side of the profile */}
          <div className="ext-left-profile">
            <img src={profileSide} alt="Background Image" />
          </div>
          {/* Main Profile details */}
          <div className="main-profile">
            <div className="main-profile-container">
              <div className="img-profile">
                <img src={userImg} alt="My Image" />
              </div>
              <div className="main-profile-det">
                <div className="profile-name">
                  <p>{user && user.name}</p>
                </div>
                <div className="profile-email">
                  <p>{user && user.email}</p>
                </div>
              </div>
            </div>
            {/* All the actions that the profile section provides to the user */}
            <div className="profile-actions-slot">
              <div className="profile-slot">
                <div className="img-action">
                  <img src={ordersImg} alt="Order Image" />
                </div>
                <div className="title-action">
                  <h4>Your Orders</h4>
                  <p>Manage and view your orders</p>
                </div>
              </div>
              <div className="profile-slot">
                <div className="img-action">
                  <img src={cartImg} alt="Order Image" />
                </div>
                <div className="title-action">
                  <h4>Cart Items</h4>
                  <p>Manage and view your cart</p>
                </div>
              </div>
              <div className="profile-slot">
                <div className="img-action">
                  <img src={wishlistImg} alt="Order Image" />
                </div>
                <div className="title-action">
                  <h4>Your Wishlist</h4>
                  <p>Manage and view your wishlist</p>
                </div>
              </div>
              <div className="profile-slot">
                <div className="img-action">
                  <img src={contactImg} alt="Order Image" />
                </div>
                <div className="title-action">
                  <h4>Contact Us</h4>
                  <p>Help Center</p>
                </div>
              </div>
              <div className="profile-slot">
                <div className="img-action">
                  <img src={loginImg} alt="Order Image" />
                </div>
                <div className="title-action">
                  <h4>Login & Security</h4>
                  <p>Edit your Login credentials</p>
                </div>
              </div>
              <div className="profile-slot">
                <div className="img-action">
                  <img src={paymentImg} alt="Order Image" />
                </div>
                <div className="title-action">
                  <h4>Payment Methods</h4>
                  <p>Manage and view your payment settings</p>
                </div>
              </div>
              <div className="profile-slot">
                <div className="img-action">
                  <img src={addressImg} alt="Order Image" />
                </div>
                <div className="title-action">
                  <h4>Your Address</h4>
                  <p>Edit, add or remove your address</p>
                </div>
              </div>
              <div className="profile-slot">
                <div className="img-action">
                  <img src={logoutImg} alt="Order Image" />
                </div>
                <div className="title-action">
                  <h4>Logout</h4>
                  <p>Logout from Ariyas</p>
                </div>
              </div>

              {/* <div className="profile-slot">
                <div className="img-action">
                  <img src={adminImg} alt="Order Image" />
                </div>
                <div className="title-action">
                  <h4>Admin Dashboard</h4>
                  <p>Manage your Admin profile</p>
                </div>
              </div> */}


            </div>
          </div>
          {/* Right side of the profile */}
          <div className="ext-right-profile">
            <img src={profileSide} alt="Background Image" />
          </div>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (state) => ({
  user: state.user.user,
});

const ConnectedProfile = connect(mapStateToProps, { loadUser })(Profile);
export default ConnectedProfile;
