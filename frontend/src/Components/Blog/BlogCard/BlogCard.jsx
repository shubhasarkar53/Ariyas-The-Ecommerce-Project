/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import PropTypes from "prop-types";
import "./BlocCard.scss";
const BlogCard = ({ blog, match }) => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div>
        <div className="blog-card">
          <div className="blog-card-img">
            <img src={blog.image} alt={blog.title} />
          </div>
          <div className="blog-card-details">
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
            <Link to={`/blog/${blog._id}`}>
              <button>Read More</button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default BlogCard;
