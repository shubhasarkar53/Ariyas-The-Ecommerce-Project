/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./BlogCard.scss";

const BlogCard = ({ blog }) => {

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };
  return (
    <Fragment>
      <Link to={`/blogs/${blog._id}`} >
        <div className="blog-card" key={blog._id}>
          <div className="blog-card-img">
            <img src={blog.image[0].url} alt={blog.title} />
          </div>
          <div className="blog-card-details">
            <h3>{blog.title}</h3>
            <p>{truncateText(blog.description,5)}</p>
          </div>
        </div>
      </Link>
    </Fragment>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default BlogCard;
