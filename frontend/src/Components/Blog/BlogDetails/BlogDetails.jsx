/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBlogDetails, clearError } from "../../../Redux/Actions/blogAction";
import Loader from "../../Loader/Loader";
import "./blogDetails.scss";
import Meta from "../../../Meta";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { SlCalender } from "react-icons/sl";
import { FaLocationArrow } from "react-icons/fa";
const BlogDetails = ({ match, history }) => {
  const dispatch = useDispatch();
  const { blog, error, loading } = useSelector((state) => state.blogDetails);
  const blogDetailsRef = useRef(null);

  useEffect(() => {
    dispatch(getBlogDetails(match.params.id));

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        autoClose: 3000,
      });
      dispatch(clearError());
    }
  }, [dispatch, match.params.id, error]);

  
  // const date = new Date(blog.createdAt);
  // const formattedDate = date.toISOString().slice(0, 10);

  return (
    <Fragment>
      <Meta title="Blog Details" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="blog-details" ref={blogDetailsRef}>
            <div className="blog-hero-sec">
              <div className="blog-details-img">
                {blog &&
                  blog.image &&
                  blog.image.map((item, i) => (
                    <img key={item.url} src={item.url} alt={`Blog image ${i}`} />
                  ))}
              </div>
              <div className="blog-content">
                <h1 className="blog-title">{blog.title}</h1>
                <p><span className="dec_span"><FaLocationArrow /></span> {blog.location}</p>
                <p><span className="dec_span">Description:</span> {blog.description}</p>
                <p><span className="dec_span"><SlCalender /></span> {blog.createdAt}</p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

BlogDetails.propTypes = {
  getBlogDetails: PropTypes.func,
  blog: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool,
  clearError: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.object,
};

export default BlogDetails;
