const cwd = process.cwd();
const path = require('path');
const fs = require('fs');

module.exports = (root = `${cwd}/application`, application = 'widget') => {
  const projectRoot = path.join(root, 'public', 'js');

  const projectScriptDirs = {};
  const getDirectories = (srcpath) => {
    return fs.readdirSync(srcpath).filter((file) => {
      return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
  };

  [application].map((type) => {
    getDirectories(path.join(projectRoot, type)).map((directory) => {
      const key = type === 'stylesheets' ? `stylesheets/${directory}` : directory;
      projectScriptDirs[key] = path.join(projectRoot, type, directory);
      return null;
    });
  });

  return {
    resolveAlias: Object.assign({
      src: projectRoot,
      i18n: path.join(projectRoot, 'i18n'),
      js: projectRoot,
      stylesheets: path.join(root, 'public', 'stylesheets'),
      react_common: path.join(root, 'public', 'js', 'react-common')
    }, projectScriptDirs)
  };
};
