/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react'

import PropTypes from 'prop-types';
import "./Search.scss"
import axios from 'axios';


const Search = ({history}) => {
    // const [keyword,setKeyword] = useState("");
    Search.propTypes = {
        history: PropTypes.object.isRequired
    };

    // async function searchSubmithandler (e){
    //     e.preventDefault();
    //     if(keyword.trim()){
    //         history.push(`/products/${keyword}`);
    //     }else{
    //         history.push('/products');
    //     }
    // }

    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/products/search?keyword=${keyword}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error(error);
        }
    };
  return (
  <Fragment>
    <form className='search-form' >
      <input 
      value={keyword}
      className='search-input'
      type="text" 
      id="search" 
      placeholder="Search Products..."
      onChange={(e) => setKeyword(e.target.value)}
       />
       <input onClick={handleSearch} className='search-button' type="submit" value="Search"/>
    </form>
    <ul>
                {searchResults.map((product) => (
                    <li key={product._id}>{product.name}</li>
                    // Display other product information as needed
                ))}
            </ul>
  </Fragment>
  )
}

export default Search
