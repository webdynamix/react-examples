import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxHelper from 'helpers/redux';
import router from './router';
import spylightObject from 'helpers/spylightObject';

try {
  spylightObject.create(() => {
    const reduxHelper = new ReduxHelper(window.spy.reducers);
    const throttle = setInterval(() => {
      const store = reduxHelper.get('store');
      if (!!store) {
        clearInterval(throttle);
        ReactDOM.render(
          <Provider store={store}>{router}</Provider>,
          document.getElementById('root')
        );
      }
    }, 50);
  });
} catch (error) {
  throw new Error(error);
}
