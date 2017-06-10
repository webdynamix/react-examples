/* eslint consistent-return:0 */
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import lazyload from 'helpers/lazyloader';

export default class ReduxHelper {
  constructor(components) {
    this.i18n = {
      en_US: {
        error: {
          required: {
            array: 'An array is required.'
          },
          undefined: 'These aren\'t the Droids you\'re looking for.'
        }
      }
    };

    if (!components || !/(object|array)/.test(typeof components)) {
      throw new Error(this.i18n.en_US.error.required.array);
    }

    this.load(components, (reducers) => {
      const initialState = this.initialState(reducers);

      this._store = createStore(
        combineReducers(reducers),
        initialState,
        applyMiddleware(thunk)
      );
    });
  }
  get(ctx) {
    const prop = `_${ctx}`;

    if (!this.hasOwnProperty(prop)) {
      return false;
    }

    return this[prop];
  }
  initialState(reducers) {
    const data = {};

    for (const reducer in reducers) {
      if (!reducers.hasOwnProperty(reducer)) continue;
      const state = reducers[reducer](null, null, true);

      data[reducer] = state;
    }

    return data;
  }
  load(components, callback) {
    const reducers = {};
    for (let i = components.length - 1; i >= 0; i--) {
      if (components[i].type !== 'smart') continue;
      const name = components[i].name;
      lazyload(name).then((dependency) => {
        reducers[name] = dependency[name];
        if (!i) {
          callback(reducers);
        }
      });
    }
  }
}
