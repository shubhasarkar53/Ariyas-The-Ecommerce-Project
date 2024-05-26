/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  deleteCreatedBlog,
  getYourBlogs,
} from "../../../Redux/Actions/blogAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Meta from "../../../Meta";
import { Typography } from "@mui/material";
import "./CreatedBlogs.scss";
import Loader from "../../Loader/Loader";
const CreatedBlogs = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {loading, error, blogs, isDeleted } =useSelector(
    (state)=>state.createdBlogs
  );

  useEffect(() => {
    dispatch(getYourBlogs());
    if (error) {
      // some toast
      toast.error(error, {
        position: "bottom-center",
        autoClose: 3000,
      });
      console.log("useeffect:", error);
      dispatch(clearError());
    }

    if (isDeleted) {
      toast.success("Blog Deleted Successfully", {
        position: "bottom-center",
        autoClose: 3000,
      });
      dispatch(getYourBlogs());
      dispatch({ type: "DELETE_BLOG_RESET" });
    }

  }, [dispatch,isDeleted,error]);

  const deleteBlogHandler = (id) => {
    dispatch(deleteCreatedBlog(id));
  };

  function handleEditBlog(blogId){
    history.push(`/edit-blog/${blogId}`)
  }

  return (
    <Fragment>
      <Meta title="Your Blogs" />
      {loading ?(
        <Loader/>
      ):(
        <Fragment>
          <ToastContainer />
          <div className="created_blogs">
            <div className="created_blogs_title">
              <Typography variant="h3">Your Blogs</Typography>
            </div>
            <div className="created_blogs_container">
              {blogs && blogs.map((blog) => (
                <div className="created_blogs_card" key={blog._id}>
                  <div className="created_blogs_card_title">
                    <Typography variant="h5">{blog.title}</Typography>
                  </div>
                  <div className="created_blogs_card_content">
                    <Typography variant="p">{blog.description}</Typography>
                  </div>
                  <div className="created_blogs_card_footer">
                    <Typography variant="p">
                      {blog.createdAt.substring(0, 10)}
                    </Typography>
                    <Typography variant="p">
                      {blog.location}
                    </Typography>
                  </div>
                  <div className="created_blogs_card_button">
                    <Link
                      to={`/view-blog/${blog._id}`}
                      className="view_blog_button"
                    >
                      View Blog
                    </Link>
                    <button
                      className="delete_blog_button"
                      onClick={() => deleteBlogHandler(blog._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="edit_blog_button"  
                      onClick={() => handleEditBlog(blog._id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CreatedBlogs;
