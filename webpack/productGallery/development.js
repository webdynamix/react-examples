
const cwd = process.cwd();
const webpack = require('webpack');
const path = require('path');
const aliases = require(`${cwd}/helpers/webpack/aliases`)();
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const bourbon = require('node-bourbon').includePaths;
const neat = require('node-neat').includePaths[1];
require('babel-polyfill');

module.exports = {
  devtool: 'cheap-source-map',
  debug: true,
  entry: {
    app: ['babel-polyfill', 'apps/productGallery/app.jsx'],
    react: 'apps/productGallery/vendor/react.js',
    jquery: 'apps/productGallery/vendor/jquery.js'
  },
  externals: {
    cheerio: 'window',
    events: 'events',
    jsdom: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  module: {
    preLoaders: [{
      test: /\.js(x)?$/,
      exclude: ['bower_components', 'node_modules'],
      loader: 'eslint'
    }, {
      test: /\.js(x)?$/,
      exclude: ['bower_components', 'node_modules'],
      loader: 'source-map-loader',
      query: {
        sourceMaps: true
      }
    }],
    loaders: [{
      test: /\.scss$/,
      loader: `style!css!sass?includePaths[]=${bourbon}&includePaths[]=${neat}`,
    }, {
      test: /\.svg$/,
      loader: 'svg-url-loader',
    }, {
      test: /\.js(x)?$/,
      exclude: ['bower_components', 'node_modules'],
      loader: 'babel',
      query: {
        compact: false,
        presets: ['airbnb']
      }
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  },
  eslint: {
    configFile: './.eslintrc',
    failOnWarning: false,
    failOnError: true,
  },
  output: {
    filename: '[name].js',
    path: path.join(cwd, 'application', 'public', 'dist', 'js', 'productGallery'),
    publicPath: '/dist/js/productGallery/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        HOST: JSON.stringify(process.env.HOST_NAME),
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new CommonsChunkPlugin('webpack.js')
  ],
  resolve: {
    extensions: ['', '.js', '.json', '.jsx', '.css', '.scss', '.sass', '.svg'],
    fallback: [cwd],
    alias: aliases.resolveAlias,
  },
  resolveLoader: {
    fallback: [cwd]
  }
};
