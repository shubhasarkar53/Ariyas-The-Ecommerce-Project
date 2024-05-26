// This file is used to filter the products based on the price and rating and also for pagination
class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    search() {
      const keyword = this.queryStr.keyword
        ? {
            name: {
              $regex: this.queryStr.keyword,
              $options: "i",
            },
          }
        : {};

        const location = this.queryStr.location
        ? {
            location: {
              $regex: this.queryStr.location,
              $options: "i",
            },
          }
        : {};
  
  
      this.query = this.query.find({ ...keyword,
        ...location
       });
      return this;
    }
  
    filter() {
      const queryCopy = { ...this.queryStr };
      //   Removing some fields for category
      const removeFields = ["keyword", "page", "limit","location"];
  
      removeFields.forEach((key) => delete queryCopy[key]);
  
      // Filter For Price and Rating
  
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
  
      // for location based filtering ✅
      if (this.queryStr.location) {
        queryStr = JSON.stringify({ ...JSON.parse(queryStr), location: this.queryStr.location });
      }

      this.query = this.query.find(JSON.parse(queryStr));
  
      return this;
    }
  
    pagination(resultPerPage) {
      const currentPage = Number(this.queryStr.page) || 1;
  
      const skip = resultPerPage * (currentPage - 1);
  
      this.query = this.query.limit(resultPerPage).skip(skip);
  
      return this;
    }
  }
  
  module.exports = ApiFeatures;