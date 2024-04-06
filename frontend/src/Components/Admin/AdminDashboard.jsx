import React from 'react'
import Loader from '../Loader/Loader';
import yourProducts from "../../assets/Images/Icons/Admin dashboard/products1.png";
import createProducts from "../../assets/Images/Icons/Admin dashboard/products2.png";
import incomingOrders from "../../assets/Images/Icons/Admin dashboard/orders1.png";
import reviews from "../../assets/Images/Icons/Admin dashboard/reviews1.png";
import authorization from "../../assets/Images/Icons/Admin dashboard/Authorizarion1.png";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profileSide from "../../assets/Images/Icons/profile icons/pngwing 3.png";




const AdminDashboard = () => {
    const { user, loading, error, isAuthenticated } = useSelector(
        (state) => state.user
      );

    const history = useHistory();
    const options = [
        {
          icon: yourProducts,
          title: "Your Products",
          text: "Manage and View Your Products",
          func: manageYourProducts,
        },
        {
          icon: createProducts,
          title: "Create Products",
          text: "Create New Product",
          func: manageCreateProducts,
        },
        {
          icon: incomingOrders,
          title: "Incoming Orders",
          text: "Manage and View Your Incoming Orders",
          func: manageIncomingOrders,
        },
        {
          icon: reviews,
          title: "Products Review",
          text: "See Your Products Reviews",
          func: manageReviews,
        },
        {
          icon: authorization,
          title: "Update Authorization",
          text: "Manage User Authorizarion",
          func: manageAuthorization,
        },
        
      ];


      function manageYourProducts(){
        history.push("/yourProducts")
      }
      function manageCreateProducts(){
        history.push("/newProduct/create")
      }
      function manageIncomingOrders(){
        history.push("/incomingOrders")
      }
      function manageReviews(){
        history.push("/manageReviews")
      }
      function manageAuthorization(){
        history.push("/authorization")
      }




    return (
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="profile-container">
              <ToastContainer/>
                <div className="profile-title">
                  <h2>Admin Dashboard</h2>
                </div>
                <div className="profile-det-container">
              
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
                    </div>
                    {/* All the actions that the profile section provides to the user */}
                    <div className="profile-actions-slot">
                      {options.map((item, index) => {
                        return (
                          <div
                            className="profile-slot"
                            key={index}
                            onClick={item.func}
                          >
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
}

export default AdminDashboard