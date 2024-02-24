/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from 'react'
import './Shop.scss'
import { useSelector,useDispatch } from 'react-redux'
import { getProducts ,clearError} from '../../Redux/Actions/productAction'
import Loader from '../Loader/Loader'
import Row from '../Row/Row'

const Shop = () => {
    const dispatch = useDispatch();
    const {products,error,loading,productCount} = useSelector((state)=>state.products);
    useEffect(() => {
        dispatch(getProducts());
        if(error){
            dispatch(clearError());
        }
    }, [dispatch, error])

  return (
   <Fragment>
    {loading?<Loader/>:(<Fragment>
        <div className='shop'>
          <p className='title'>Shop</p>
          <div className='bar'></div>
          <Row products={products}  loading={loading} error={error} />
        </div>
    </Fragment>)}
   </Fragment>

  )
}

export default Shop
