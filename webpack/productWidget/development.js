const cwd = process.cwd();
const webpack = require('webpack');
const path = require('path');
const aliases = require(`${cwd}/helpers/webpack/aliases`)(`${cwd}/application`, 'productWidget');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const sassLoader = require(`${cwd}/helpers/webpack/sassLoader`)(`$ENV_HOST:'${process.env.HOST_NAME}';`);

module.exports = {
  devtool: 'cheap-source-map',
  debug: true,
  entry: {
    embed_gallery: ['babel-polyfill', 'apps/productWidget/app.jsx'],
    react: 'apps/productWidget/vendor/react.js',
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
    loaders: [
      sassLoader.loader,
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: /\.js(x)?$/,
        exclude: ['bower_components', 'node_modules'],
        loader: 'babel',
        query: {
          compact: false,
          presets: ['airbnb']
        }
      }]
  },
  eslint: {
    configFile: './.eslintrc',
    failOnWarning: false,
    failOnError: true,
  },
  output: {
    filename: '[name].js',
    path: path.join(cwd, 'application', 'public', 'widget'),
    publicPath: '//ad.spylig.ht/widget/',
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
    new CommonsChunkPlugin({ name: 'embed_gallery' }),
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
