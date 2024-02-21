/* eslint-disable no-unused-vars */
import React from 'react'
import "./Loader.scss"
import gif from "../../assets/Images/Gifs/Bean Eater-1s-200px.gif"
const Loader = () => {
  return (
    <div className='loader-container'>
        <img src={gif} alt="" />
    </div>
  )
}

export default Loader
