const cwd = process.cwd();
const config = require(`${cwd}/webpack/productGallery/development.js`);

config.resolve.alias = Object.assign({}, config.resolve.alias, {
  react: 'react-lite',
  'react-dom': 'react-lite',
});

module.exports = config;
