/* eslint-disable no-unused-vars */
import React from 'react'
import ProductCard from './ProductCard'
import "./Home.scss"
const Home = () => {

    const arr = [1,2,3,4,5,6,7,8,9,10,11,12]
  return (
    <div>
        <div className="othes"></div>
        <div className="container">
            <div className="allProductContainer">
                {
                    arr.map((item,index)=>(<ProductCard key={index}/>))
                }
                
            </div>
        </div>
        
    </div>
  )
}

export default Home