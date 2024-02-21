/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import ProductCard from './ProductCard'
import "./Home.scss"
import {useSelector,useDispatch } from 'react-redux'
import { getProducts } from '../../Redux/Actions/productAction'
import Row from '../Row/Row'
const Home = () => {
    const dispatch = useDispatch();
    const {products,error,loading,productCount} = useSelector((state)=>state.products);
    console.log("home",products[0]);
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])
    
  return (
    <div>
        <div className="carosoul">Carousel Here</div>
         
                <Row products={products} loading={loading} error={error}/>
                <Row products={products} loading={loading} error={error}/>
                <Row products={products} loading={loading} error={error}/>
                
    </div>
)
}

export default Home