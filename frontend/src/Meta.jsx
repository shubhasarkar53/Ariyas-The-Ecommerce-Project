/* eslint-disable no-unused-vars */
import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{String(title)}</title>
      <meta name="description" content={String(description)} />
      <meta name="keywords" content={String(keywords)} />
      {/* Open Graph tags for social media */}
      <meta property="og:title" content={String(title)} />
      <meta property="og:description" content={String(description)} />
      <meta property="og:type" content="website" />
      {/* Add more meta tags as needed */}
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to MyShop',
  description: 'We sell the best products for cheap',
  keywords: 'electronics, buy electronics, cheap electronics'
};

export default Meta;
