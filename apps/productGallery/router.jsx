import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Widget from 'components/widget';

export default (
  <Router history={browserHistory}>
    <Route path="/widget" component={Widget} />
  </Router>
);
