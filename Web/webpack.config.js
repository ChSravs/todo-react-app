var path = require('path');
module.exports = {
    entry: ["babel-polyfill", "./src/index.js"],
    output:{
        filename:'bundle.js',
    }
  };