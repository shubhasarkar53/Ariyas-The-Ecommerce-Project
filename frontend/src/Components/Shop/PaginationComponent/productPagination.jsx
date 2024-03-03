/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import PropTypes from 'prop-types';
import './productPagination.scss'
const ProductPagination = ({ totalPages, currentPage, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Fragment >

      <div className='pagination-container'>
        <Pagination
          className={'pagination-div'}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            margin: '1rem 0',
            gap: '10.5rem',
          }}
          color="secondary"
          size="large"
          shape="rounded"
          defaultPage={1}
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
          renderItem={(item) => (
            <PaginationItem
              component="a"
              {...item}
            />
          )}
        />
      </div>

    </Fragment>

  );

};

export default ProductPagination;


//*Explaination

// This code defines a React component called `ProductPagination` using Material-UI's `Pagination` component. Let's break down the code:

// 1. **Imports**:
//    - `React`: Importing React library.
//    - `Pagination`, `PaginationItem`: Importing components from Material-UI's `@mui/material` library.

// 2. **ProductPagination Component**:
//    - This is a functional component that takes three props: `totalPages`, `currentPage`, and `onPageChange`.
//    - `totalPages`: The total number of pages in the pagination.
//    - `currentPage`: The current active page.
//    - `onPageChange`: A function to handle page change events.

// 3. **handleChange Function**:
//    - This function is called when the user changes the page. It invokes the `onPageChange` function with the new page number as its argument.

// 4. **Pagination Component**:
//    - This is the Material-UI `Pagination` component.
//    - It receives various props:
//      - `sx`: Styling object using Material-UI's sx prop to center the pagination horizontally and add some margin.
//      - `color`: Sets the color of the pagination controls.
//      - `size`: Sets the size of the pagination controls.
//      - `shape`: Sets the shape of the pagination controls.
//      - `defaultPage`: The default page number to be displayed when the component mounts.
//      - `count`: The total number of pages.
//      - `page`: The current active page.
//      - `onChange`: Event handler function to be called when the page changes.
//      - `renderItem`: A function to customize the rendering of each pagination item. In this case, it renders each item as an anchor (`<a>`) element.

// 5. **Export**:
//    - The `ProductPagination` component is exported as the default export from the file, making it available for use in other parts of the application.

// Overall, this component provides a pagination interface with Material-UI styling and functionality, allowing users to navigate through multiple pages of content.
