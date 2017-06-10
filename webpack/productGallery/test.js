/*
  used for unit testing
*/
const cwd = process.cwd();
const bourbon = require('node-bourbon').includePaths;
const neat = require('node-neat').includePaths[1];

module.exports = (wallaby) => {
  const aliases = require(`${cwd}/helpers/webpack/aliases`)(`${wallaby.projectCacheDir}/application`);

  return {
    debug: true,
    externals: {
      events: 'events',
      jsdom: 'window',
      cheerio: 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    },
    resolve: {
      extensions: ['', '.js', '.json', '.jsx', '.css', '.scss', '.sass', '.svg'],
      fallback: [cwd],
      alias: aliases.resolveAlias
    },
    resolveLoader: {
      fallback: [cwd]
    },
    module: {
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
      }],
      noParse: [
        /\/sinon\.js/
      ]
    },

    node: {
      fs: 'empty'
    }
  };
};
