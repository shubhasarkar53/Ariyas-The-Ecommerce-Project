/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from 'react'
import ProductCard from './ProductCard'
import "./Home.scss"
import {useSelector,useDispatch } from 'react-redux'
import { getProducts } from '../../Redux/Actions/productAction'
import Row from '../Row/Row'
import Loader from '../Loader/Loader'
const Home = () => {
    const dispatch = useDispatch();
    const {products,error,loading,productCount} = useSelector((state)=>state.products);
    console.log("home",products[0]);
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    return (
        <Fragment>
            {loading ? (<Loader/>) : (
                <div>
                    <div className="carosoul">Carousel Here</div>
                    <Row products={products} loading={loading} error={error} />
                    <Row products={products} loading={loading} error={error} />
                    <Row products={products} loading={loading} error={error} />
                </div>
            )}
        </Fragment>
    )
                
}

export default Home