/*
  TEST RUNNER
*/
process.env.NODE_ENV = 'test';

const cwd = process.cwd();
const fs = require('fs');
const path = require('path');
const babelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '.babelrc'), 'utf-8'));
const wallabyWebpack = require('wallaby-webpack');

module.exports = (wallaby) => {
  const webpackConfig = require(`${cwd}/webpack/widget/test.js`)(wallaby);
  webpackConfig.externals['sinon'] = 'sinon';

  return {
    testFramework: 'mocha',
    debug: true,
    files: [{
      pattern: 'node_modules/chai/chai.js',
      instrument: false
    }, {
      pattern: 'node_modules/sinon/pkg/sinon.js',
      instrument: false
    }, {
      pattern: 'node_modules/sinon-chai/lib/sinon-chai.js',
      instrument: false
    }, {
      pattern: 'node_modules/phantomjs-polyfil/bind-polyfill.js',
      instrument: false
    }, {
      pattern: 'application/public/js/**/!(*-*-spec).js?(x)',
      load: false
    }, {
      pattern: 'application/public/js/i18n/en_US/**/*.json',
      load: false
    }, {
      pattern: 'application/public/stylesheets/**/*.scss',
      load: false
    }],
    tests: [{
      pattern: 'application/public/**/*-integration-spec.js?(x)',
      load: false
    }, {
      pattern: 'application/public/**/*-unit-spec.js?(x)',
      load: false
    }],
    workers: {
      recycle: true
    },
    compilers: {
      'application/public/js/{[!bower_components/]**/*,**}/*.js?(x)': wallaby.compilers.babel(babelConfig)
    },
    preprocessors: {
      'application/public/js/**/*.js?(x)': file => require('babel-core').transform(
        file.content, {
          sourceMaps: 'both'
        }
      )
    },
    postprocessor: wallabyWebpack(webpackConfig),
    env: {
      runner: require('phantomjs-prebuilt').path
    },
    setup: function () {
      window.sinon = sinon;
      window.expect = chai.expect;
      window.__moduleBundler.loadTests();
    }
  };
};
