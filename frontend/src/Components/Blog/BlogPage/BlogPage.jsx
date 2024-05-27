/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from "react";
import "./BlogPage.scss";
import PropTypes from "prop-types";
import { getBlogs, clearError } from "../../../Redux/Actions/blogAction";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../BlogCard/BlogCard";
import Meta from "../../../Meta";
import Loader from "../../Loader/Loader";
import { Link } from "react-router-dom";
import image1 from "../../../assets/Images/Blog/istockphoto-1078456356-612x612.jpg";
import image2 from "../../../assets/Images/Blog/istockphoto-1183493646-612x612.jpg";
import image3 from "../../../assets/Images/Blog/istockphoto-1193642393-612x612.jpg";
import image4 from "../../../assets/Images/Blog/istockphoto-1214656431-612x612.jpg";
import image5 from "../../../assets/Images/Blog/istockphoto-1277101530-612x612.jpg";
import image6 from "../../../assets/Images/Blog/istockphoto-171345335-612x612.jpg";
import image7 from "../../../assets/Images/Blog/istockphoto-174790323-612x612.jpg";
import image8 from "../../../assets/Images/Blog/istockphoto-508651257-612x612.jpg";

const BlogPage = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, blogs } = useSelector((state) => state.blogs);
  // console.log(blogs.blog.image);
  useEffect(() => {
    dispatch(getBlogs());
    dispatch(clearError());
  }, [dispatch]);

  return (
    <Fragment>
      <Meta title="Ariyas | Blog" />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="blog-page">
            <div className="blog-page-header">
              <div className="header-text">
                <h1>Blogs From Artists</h1>
              </div>
              <div className="image-grid">
                <div className="image-item">
                  <img src={image1} alt="Art 1" />
                </div>
                <div className="image-item">
                  <img src={image2}  alt="Art 2" />
                </div>
                <div className="image-item">
                  <img src={image3}  alt="Art 3" />
                </div>
                <div className="image-item">
                  <img src={image4}  alt="Art 4" />
                </div>
                <div className="image-item">
                  <img src={image5} alt="Art 5" />
                </div>
                <div className="image-item">
                  <img src={image6}  alt="Art 6" />
                </div>
                <div className="image-item">
                  <img src={image7}  alt="Art 7" />
                </div>
                <div className="image-item">
                  <img src={image8}  alt="Art 8" />
                </div>
              </div>
            </div>
            <div className="blog-page-container">
              {blogs.map((blog) => (
                <BlogCard blog={blog} key={blog._id} />
              ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

BlogPage.propTypes = {
  match: PropTypes.object,
};

export default BlogPage;
