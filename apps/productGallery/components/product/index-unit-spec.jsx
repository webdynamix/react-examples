import React from 'react';
import { shallow } from 'enzyme';

import { Product } from './index.jsx';
import 'isomorphic-fetch';
import * as actions from '../../actions/product';
import sinon from 'sinon';

describe('Product component', () => {
  describe('render', () => {
    let Component;

    let testData = {
      exact: {},
      similar: {},
      budget: {},
    };
    let testGallery = {
      image: '',
    };

    beforeEach(() => {
      Component = shallow(
        <Product
          actions={actions}
          productSet={testData}
          current=""
          gallery={testGallery}
        />);
    });
    it('should have a main tag', () => {
      expect(Component.find('main').length).to.equal(1);
    });
    it('should show a Header component in main', () => {
      expect(Component.find('main').find('Header').length).to.equal(1);
    });
    it('should show a Nav component in main', () => {
      expect(Component.find('main').find('Nav').length).to.equal(1);
    });
    it('should show a ProductCarousel component in main', () => {
      expect(Component.find('main').find('ProductCarousel').length).to.equal(1);
    });
    it('should show a Footer component in main', () => {
      expect(Component.find('main').find('Footer').length).to.equal(1);
    });
  });

  describe('function', () => {
    let Component;

    let testData = {
      exact: {},
      similar: {},
      budget: {},
    };
    let testGallery = {
      image: '',
    };

    beforeEach(() => {
      Component = shallow(
        <Product
          actions={actions}
          productSet={testData}
          current=""
          gallery={testGallery}
          productId={1}
        />);
    });

    it('getCurrentIndex should return 0 if exact', () => {
      Component.setProps({ current: 'exact' });
      expect(Component.instance().getCurrentIndex()).to.equal(0);
    });
    it('getCurrentIndex should return 1 if similar', () => {
      Component.setProps({ current: 'similar' });
      expect(Component.instance().getCurrentIndex()).to.equal(1);
    });
    it('getCurrentIndex should return 2 if budget', () => {
      Component.setProps({ current: 'budget' });
      expect(Component.instance().getCurrentIndex()).to.equal(2);
    });

    it('getCurrentType should return exact if index = 0', () => {
      expect(Component.instance().getCurrentType(0)).to.equal('exact');
    });
    it('getCurrentType should return similar if index = 1', () => {
      expect(Component.instance().getCurrentType(1)).to.equal('similar');
    });
    it('getCurrentType should return budget if index = 2', () => {
      expect(Component.instance().getCurrentType(2)).to.equal('budget');
    });

    it('onNavClick should call swapCurrent', () => {
      const spy = sinon.spy(actions, 'swapCurrent');
      Component.instance().onNavClick();
      expect(spy.calledOnce).to.equal(true);
      spy.restore();
    });

    it('onSlideChangeUpdate should call swapCurrent if current index does not equal index', () => {
      const spy = sinon.spy(actions, 'swapCurrent');
      Component.setProps({ current: 'exact' });
      Component.instance().onSlideChangeUpdate(1);
      expect(spy.calledOnce).to.equal(true);
      spy.restore();
    });
    it('onSlideChangeUpdate should not call swapCurrent if current index equals index', () => {
      const spy = sinon.spy(actions, 'swapCurrent');
      Component.setProps({ current: 'exact' });
      Component.instance().onSlideChangeUpdate(0);
      expect(spy.calledOnce).to.equal(false);
      spy.restore();
    });

    it('componentWillReceiveProps should call getProductSet if new productID is given', () => {
      const spy = sinon.spy(Product.prototype, 'getProductSet');
      Component.setProps({ productId: 2 });
      expect(spy.calledOnce).to.equal(true);
      spy.restore();
    });
    it('componentWillReceiveProps should not call getProductSet if no new productID is given', () => {
      const spy = sinon.spy(Product.prototype, 'getProductSet');
      Component.setProps({ productId: 1 });
      expect(spy.calledOnce).to.equal(false);
      spy.restore();
    });
  });
});
