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
import imageheader from "../../../assets/Images/Blog/blog header.webp";
import gsap from "gsap";

const BlogPage = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, blogs } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getBlogs());
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    gsap.from(".jelly-text", {
      duration: 1.5,
      y: 50,
      opacity: 0,
      ease: "bounce.out",
    });

    gsap.from(".blog-page-container .blog-card", {
      duration: 1,
      y: 20,
      opacity: 0,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, [blogs]);

  useEffect(() => {
    if (blogs.length === 0) {
      gsap.from(".no-blogs-text", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "bounce.out",
      });
    }
  }, [blogs]);

  return (
    <Fragment>
      <Meta title="Ariyas | Blog" />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="blog-page">
            <div className="jelly-text-container">
              <div className="text-box">
                <h1 className="jelly-text">
                  BLOGS BY ARTICIANS AND KNOW MORE ABOUT HANDCRAFTED TREASURES
                </h1>
                <p className="website">Ariyas-shop.com</p>
              </div>
              <img
                src={imageheader}
                alt="Smiling Woman"
                className="background-image"
              />
            </div>
            <div className="blog-page-container">
              {blogs.length > 0 ? (
                blogs.map((blog) => <BlogCard blog={blog} key={blog._id} />)
              ) : (
                <div className="no-blogs-text">
                  <h2>Currently, no blogs are available</h2>
                </div>
              )}
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
