/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import ProductCard from './ProductCard'
import "./Home.scss"
import {useSelector,useDispatch } from 'react-redux'
import { getProducts } from '../../Redux/Actions/productAction'
const Home = () => {
    const dispatch = useDispatch();
    const {products,error,loading,productCount} = useSelector((state)=>state.products);
    console.log("home",products[0]);
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])
    
  return (
    <div>
        <div className="othes"></div>
        <div className="container">
            <div className="allProductContainer">
                {
                    
                    products && products.map((product)=>{
                        return(
                                  <ProductCard key={product._id}  product = {product} />
                         
                        )
                    })
                    
                }
                
            </div>
        </div>
        
    </div>
)
}

export default Home