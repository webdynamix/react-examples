const cwd = process.cwd();
const webpack = require('webpack');
const config = require(`${cwd}/webpack/productWidget/staging.js`);

config.plugins.push(new webpack.optimize.UglifyJsPlugin());

module.exports = config;
