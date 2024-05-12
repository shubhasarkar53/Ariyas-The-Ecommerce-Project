/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import './Share.scss';

const ProductShare = ({ product }) => {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Check out this product!',
        url: product.link
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <IconButton onClick={handleShare} aria-label="share product">
      <ShareIcon />
    </IconButton>
  );
};

export default ProductShare;
