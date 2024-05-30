/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@mui/material";
import { createBlog, clearError } from "../../../Redux/Actions/blogAction";
import { CREATE_BLOG_RESET } from '../../../Redux/Constants/blogConstants';
import Meta from '../../../Meta';
import Loader from '../../Loader/Loader';
import "./CreateBlogs.scss";

const CreateBlogs = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isCreated, error, loading } = useSelector((state) => state.createBlog);

  const [blogImg, setBlogImg] = useState("");
  const [formData, setFormData] = useState({
    blogTitle: "",
    blogDescription: "",
    blogLocation: "",
  });

  const {
    blogTitle,
    blogDescription,
    blogLocation,
  } = formData;

  const handleChange = (e) => {
    if (e.target.name === "blogImg") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setBlogImg(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const myFormData = new FormData();
    myFormData.set("title", blogTitle);
    myFormData.set("description", blogDescription);
    myFormData.set("location", blogLocation);
    myFormData.set("image", blogImg);
    dispatch(createBlog(myFormData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        autoClose: 3000,
      });
      dispatch(clearError());
    }

    if (isCreated) {
      history.push("/admin");
      toast.success("Blog Created Successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch({ type: CREATE_BLOG_RESET });
    }
  }, [dispatch, history, isCreated, error]);

  return (
    <Fragment>
      <Meta title="Create New Blog"/>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <ToastContainer />
          <div className="createProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <Typography variant="h3" style={{ padding: "2vmax" }}>
                Create New Blog
              </Typography>
              <div>
                <input
                  type="file"
                  name="blogImg"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  required
                  name="blogTitle"
                  value={blogTitle}
                  onChange={handleChange}
                />
              </div>
              <div>
                <textarea
                  type="text"
                  rows="5"
                  cols="60"
                  placeholder="Description"
                  required
                  name="blogDescription"
                  value={blogDescription}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Location"
                  required
                  name="blogLocation"
                  value={blogLocation}
                  onChange={handleChange}
                />
              </div>
              <button
                id="createProductBtn"
                type="submit"
                disabled={loading}
              >
                Create
              </button>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CreateBlogs;
