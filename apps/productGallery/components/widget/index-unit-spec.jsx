import React from 'react';
import { shallow } from 'enzyme';

import * as actions from 'actions/widget';
import { Widget } from './index.jsx';
import 'isomorphic-fetch';
import Product from '../product';
import ProductGallery from '../productGallery';
import sinon from 'sinon';

// import fetchMock from 'fetch-mock';

describe('Widget component', () => {
  const testData = {
    name: 'test',
    source: 'test',
    price: 'test',
    query: 'test',
  };

  describe('render', () => {
    let Component;

    // const testPSData = {
    //   exact: { name: 'test' },
    //   similar: { name: 'test' },
    //   budget: { name: 'test' },
    // };

    beforeEach(() => {
      Component = shallow(
        <Widget
          pubId="1"
          productId="1"
          outfitId="1"
          actions={actions}
          location={testData}
        />);
    });
    it('should hold everything in a div called Widget', () => {
      expect(Component.find('div[data-component="Widget"]').length).to.equal(1);
    });
    it('should show Product', () => {
      expect(Component.find(Product).length).to.equal(1);
    });
    it('should show ProductGallery', () => {
      expect(Component.find(ProductGallery).length).to.equal(1);
    });
  });

  describe('function', () => {
    const Component = shallow(
      <Widget
        pubId="1"
        productId="1"
        outfitId="1"
        actions={actions}
        location={testData}
      />);
    it('onProductClick should call swapProductId', () => {
      const spy = sinon.spy(actions, 'swapProductId');
      Component.instance().onProductClick();
      expect(spy.calledOnce).to.equal(true);
      spy.restore();
    });
  });
});
