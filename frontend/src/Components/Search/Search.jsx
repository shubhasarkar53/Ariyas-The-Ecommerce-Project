/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import "./Search.scss"


const Search = ({history}) => {

    const [keyword,setKeyword] = useState("");

    const searchSubmithandler = (e)=>{
        e.preventDefault();
        if(keyword.trim()){
            history.push(`/products/${keyword}`);
        }else{
            history.push('/products');
        }
    }


  return (
  <Fragment>
    <form className='search-form'  onSubmit={ searchSubmithandler}>
      <input 

      value={keyword}
      className='search-input'
      type="text" 
      id="search" 
      placeholder="Search Products..."
      onChange={(e) => setKeyword(e.target.value)}
       />
       <input className='search-button' type="submit" value="Search" />
    </form>
  </Fragment>
  )
}


Search.propTypes = {
    history: PropTypes.object.isRequired
};

export default Search
