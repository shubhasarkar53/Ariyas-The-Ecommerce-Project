/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from 'react'
import "./Home.scss"
import {useSelector,useDispatch } from 'react-redux'
import { getProducts } from '../../Redux/Actions/productAction'
import Row from '../Row/Row'
import Loader from '../Loader/Loader'
import ImageCarousel from '../Carousel/Carousel'

const Home = () => {
    const dispatch = useDispatch();
    const {products,error,loading,productCount} = useSelector((state)=>state.products);
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    return (
        <Fragment>
            {loading ? (<Loader/>) : (
                <div>
                    <ImageCarousel/>
                    <Row products={products} loading={loading} error={error} />
                    <Row products={products} loading={loading} error={error} />
                    <Row products={products} loading={loading} error={error} />
                </div>
            )}
        </Fragment>
    )
                
}

export default Home