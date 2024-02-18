/* eslint-disable no-unused-vars */
import React from 'react'
import ProductCard from './ProductCard'
import "./Home.scss"
import { getProduct } from '../../actions/productActions';
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { clearErrors } from "../../actions/productActions";
const Home = () => {

const dispatch = useDispatch();
const {products,
    loading,
    error} = useSelector((state)=>state.products);

console.log(products);
useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      // Optionally, you can add a delay before clearing errors to display error messages to the user for a certain amount of time
      const errorTimeout = setTimeout(() => {
        dispatch(clearErrors());
      }, 5000); // Clear errors after 5 seconds
      return () => clearTimeout(errorTimeout);
    }
  }, [error, dispatch]);


return (
    <div>
            <div className="othes"></div>
            <div className="container">
                    <div className="allProductContainer">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>
            </div>
            
    </div>
)
}

export default Home