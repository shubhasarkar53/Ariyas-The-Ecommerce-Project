/* eslint-disable no-unused-vars */
import React from 'react'
import './PageNotFoundStyle.scss';
import pagenotfound from '../../assets/Gifs/404 Error Page not Found with people connecting a plug.gif'
import { Link } from 'react-router-dom';
import Meta from "../../Meta";
const PageNotFound = () => {
  return (
    <>
      <Meta title="Page Not Found" />
      <div className="no-page-container">
        <div className="image-not-found">
          <img src={pagenotfound} alt="page not found" />
        </div>
        <div className="btn-not-found">
          <Link to="/">
            <button>Go back</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default PageNotFound