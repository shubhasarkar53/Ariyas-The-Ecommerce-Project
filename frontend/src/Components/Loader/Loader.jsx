/* eslint-disable no-unused-vars */
import React from 'react'
import "./Loader.scss"
import gif from "../../assets/Gifs/Bean Eater-1s-200px.gif"
import Meta from "../../Meta"
const Loader = () => {
  return (
    <div className='loader-container'>
      <Meta title="Loading" />
      <img src={gif} alt="" />
    </div>
  )
}

export default Loader
