/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from 'react'
import './Shop.scss'
import { useSelector,useDispatch } from 'react-redux'
import { getProducts ,clearError} from '../../Redux/Actions/productAction'
import Loader from '../Loader/Loader'
import Row from '../Row/Row'
import { keyframes } from '@emotion/react'
import PropTypes from 'prop-types';
import { Pagination } from 'react-js-pagination';
import ProductCard from '../Home/ProductCard'

const Shop = ({match}) => {

    const dispatch = useDispatch();

    const keyword = match.params.keyword;

    const {products,error,loading,productCount,resultPerPage} = useSelector((state)=>state.products);

    useEffect(() => {
      dispatch(getProducts(keyword));
      if(error){
        dispatch(clearError());
      }
    }, [dispatch, error, keyword])

  return (
   <Fragment>
    {loading?<Loader/>:(<Fragment>
        <div className='shop'>
          <p className='title'>Shop</p>
          <div className='bar'></div>
          {/* <Row products={products}  loading={loading} error={error} /> */}
          <div className="products-container">
          {
            products && products.map((product)=>{
                return(
                    <ProductCard key={product._id}  product = {product} />
                )
            })
        }
          </div>
        </div>
        <div className="paginationBox">
   
        </div>
    </Fragment>)}
   </Fragment>

  )
}


Shop.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      keyword: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};


export default Shop
