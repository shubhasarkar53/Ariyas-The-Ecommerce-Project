/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBlogDetails, clearError } from "../../../Redux/Actions/blogAction";
import Loader from "../../Loader/Loader";
import "./blogDetails.scss";
import Meta from "../../../Meta";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const BlogDetails = ({ match, history }) => {
  const dispatch = useDispatch();
  const { blog, error, loading } = useSelector((state) => state.blogDetails);

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

  return (
    <Fragment>
      <Meta title="Blog Details" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="blog-details">
            <div className="blog-hero-sec">
              <h1 className="blog-title">{blog.title}</h1>
              <div className="blog-details-img">
                {blog &&
                  blog.image &&
                  blog.image.map((item, i) => (
                    <img key={item.url} src={item.url} alt={`Blog image ${i}`} />
                  ))}
                  <p>{blog.location}</p>
              </div>
            </div>
            <div className="blog-content">
            <p><span className="dec_span">Description:</span>{blog.description}</p>
            <p><span className="dec_span">CreatedAt:</span>{blog.createdAt}</p>
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
