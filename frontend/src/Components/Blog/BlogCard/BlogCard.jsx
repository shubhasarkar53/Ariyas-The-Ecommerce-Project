/* eslint-disable no-unused-vars */
// import React, { Fragment } from "react";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import "./BlogCard.scss";

// const BlogCard = ({ blog }) => {

//   const truncateText = (text, limit) => {
//     const words = text.split(" ");
//     if (words.length > limit) {
//       return words.slice(0, limit).join(" ") + "...";
//     }
//     return text;
//   };
//   return (
//     <Fragment>
//       <Link to={`/blogs/${blog._id}`} >
//         <div className="blog-card" key={blog._id}>
//           <div className="blog-card-img">
//             <img src={blog.image[0].url} alt={blog.title} />
//           </div>
//           <div className="blog-card-details">
//             <h3>{blog.title}</h3>
//             <p>{truncateText(blog.description,5)}</p>
//             <p>{blog.location}</p>
//             <p>{blog.createdAt}</p>
//           </div>
//         </div>
//       </Link>
//     </Fragment>
//   );
// };

// BlogCard.propTypes = {
//   blog: PropTypes.object.isRequired,
// };

// export default BlogCard;

import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./BlogCard.scss";
import { SlCalender } from "react-icons/sl";
import { FaLocationArrow } from "react-icons/fa";

const BlogPost = ({ blog }) => {
  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  const date = new Date(blog.createdAt);
  const formattedDate = date.toISOString().slice(0, 10);
  return (
    <Fragment>
      <Link to={`/blogs/${blog._id}`}>
        <div className="blog-post">
          <div className="image-section">
            <img
              src={blog.image[0].url}
              alt={blog.title}
              className="blog-image"
            />
          </div>
          <div className="content-section">
            <div className="author-info">
              <div className="author-details">
                <h4><FaLocationArrow /> {blog.location}</h4>
                <p><SlCalender /> {formattedDate}</p>
              </div>
            </div>
            <h1>{blog.title}</h1>
            <p className="description">{truncateText(blog.description, 50)}</p>
          </div>
        </div>
      </Link>
    </Fragment>
  );
};

BlogPost.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default BlogPost;
