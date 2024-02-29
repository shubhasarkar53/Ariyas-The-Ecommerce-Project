/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const PriceFilterSlider  = ({ minPrice, maxPrice, onChange }) => {
  const [value, setValue] = useState([minPrice, maxPrice]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div style={{ width: '300px', margin: '20px auto' }}>
      <Typography id="price-slider" gutterBottom>
        Price Range
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        min={minPrice}
        max={maxPrice}
        valueLabelDisplay="auto"
        aria-labelledby="price-slider"
      />
      <Typography variant="caption"   gutterBottom>
        Min:&#x20B9; {value[0]} Max:&#x20B9; {value[1]}
      </Typography>
    </div>
  );
};

export default PriceFilterSlider ;
