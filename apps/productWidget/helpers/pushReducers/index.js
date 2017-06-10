const pushReducers = (spy) => {
  for (let i = 0; i < spy.components.length; i++) {
    spy.reducers.push({ type: 'smart', name: spy.components[i], data: 0 });
  }
};

export default pushReducers;
