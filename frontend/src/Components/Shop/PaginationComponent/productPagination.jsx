/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import PropTypes from 'prop-types';
import './productPagination.scss'

const ProductPagination = ({ totalPages, currentPage, onPageChange,productCount,resultPerPage }) => {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Fragment>
      <div className='pagination-container'>
        <Pagination
          className={`pagination-div`}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            margin: '1rem 0',
            gap: '10.5rem',
          }}
          color="primary"
          size="large"
          shape="rounded"
          defaultPage={1}
          count={totalPages}
          page={currentPage}
          showFirstButton
          showLastButton
          onChange={handleChange}
          renderItem={(item) => (
            <PaginationItem
              component="a"
              {...item}
              style={{
                color: item.page === currentPage ? 'white' : '',
                backgroundColor: item.page === currentPage ? 'orange' : '',
                fontWeight: item.page === currentPage ? 'bold' : 'normal',
                fontSize: item.page === currentPage ? '1.01rem' : '',
              }}
            />
          )}
        />
      </div>
    </Fragment>
  );
};

ProductPagination.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  productCount: PropTypes.number,
  resultPerPage: PropTypes.number
}

export default ProductPagination;
