const { Promise } = global;
export default (dependency) => {
  return new Promise((resolve, reject) => {
    try {
      require.ensure([], (require) => {
        const component = {};
        const key = dependency.match(/([\w]+)$/)[0];
        const ctx = require.context('reducers', true, /index\.js$/);
        const file = ctx(`./${dependency}/index.js`);

        component[key] = {}.hasOwnProperty.call(file, 'default') ? file.default : file;
        resolve(component);
      });
    } catch (err) {
      reject(err);
    }
  });
};
