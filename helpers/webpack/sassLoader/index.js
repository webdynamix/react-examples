const bourbon = require('node-bourbon').includePaths;
const neat = require('node-neat').includePaths[1];

module.exports = (variables = '') => {
  return {
    loader: Object.assign({
      test: /\.scss$/,
      loader: `style!css!sass?data=${variables}&includePaths[]=${bourbon}&includePaths[]=${neat}`,
    })
  };
};
