/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getBlogDetails,clearError} from "../../../Redux/Actions/blogAction";
import Loader from "../../Loader/Loader";
import "./blogDetails.scss"
import Meta from "../../../Meta";
const BlogDetails = () => {
  const { blog , loading} = useSelector((state) => state.blogDetails);
  console.log(blog);

  useEffect(() => {
    getBlogDetails();
  }, []);
  return (
    <Fragment>
      <Meta title="Blog Details"/>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="blog-details">
            <h1>{blog.title}</h1>
            <div className="blog-details-img">
              <img src={blog.image} alt={blog.title} />
            </div>
            <p>{blog.description}</p>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default BlogDetails;
