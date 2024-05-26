/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import "./BlogPage.scss";
import PropTypes from "prop-types";
import {getBlogs,clearError} from "../../../Redux/Actions/blogAction";
import { useSelector } from 'react-redux';
const BlogPage = ({match}) => {
  // const{} = useSelector((state)=>state.blog)
  return (
    <Fragment>
        <h1>Blog Page</h1>
    </Fragment>
  )
}

BlogPage.propTypes = {
  match: PropTypes.object
}

export default BlogPage
