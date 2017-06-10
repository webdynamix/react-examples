import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxHelper from 'helpers/redux';
import App from 'components/app';
import OutfitsApp from 'components/outfits';

class appCreator {

  constructor(props) {
    this.props = props;
    this.ReactDOM = ReactDOM;
    this.reduxHelper = new ReduxHelper(window.spylight.reducers);
  }

  app() {
    if (this.props.hasOwnProperty('gallery') && !!this.props.gallery) {
      return <OutfitsApp outfitsIds={this.props.gallery} />;
    }
    return <App id={Number(this.props.id)} />;
  }

  render() {
    const throttle = setInterval(() => {
      this.store = this.reduxHelper.get('store');
      if (!!this.store) {
        clearInterval(throttle);
        this.ReactDOM.render(
          <Provider store={this.store}>
            {this.app()}
          </Provider>,
          document.getElementById(this.props.container)
        );
      }
    }, 50);
  }
}

export default appCreator;
