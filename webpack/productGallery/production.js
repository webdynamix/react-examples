const cwd = process.cwd();
const config = require(`${cwd}/webpack/productGallery/staging.js`);
const webpack = require('webpack');

config.plugins.push(new webpack.optimize.UglifyJsPlugin());

module.exports = config;
