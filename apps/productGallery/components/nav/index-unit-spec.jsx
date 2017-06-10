import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import 'isomorphic-fetch';
import Nav from './index.jsx';

describe('Nav component', () => {
  describe('render', () => {
    let Component;

    beforeEach(() => {
      Component = shallow(<Nav />);
    });
    it('should have a nav', () => {
      expect(Component.find('nav').length).to.equal(1);
    });
    it('should show a link named similar', () => {
      expect(Component.find('a[data-type="similar"]').length).to.equal(1);
    });
    it('should show a link named exact', () => {
      expect(Component.find('a[data-type="exact"]').length).to.equal(1);
    });
    it('should show a link named budget', () => {
      expect(Component.find('a[data-type="budget"]').length).to.equal(1);
    });
    it('should show three total links', () => {
      expect(Component.find('a').length).to.equal(3);
    });
  });

  describe('functions', () => {
    let Component;

    let testFunc = () => {};

    beforeEach(() => {
    });

    it('should react to button press', () => {
      const spy = sinon.spy(Nav.prototype, 'changeCurrent');
      Component = mount(<Nav onNavClick={testFunc} />);
      Component.find('a[data-type="exact"]').simulate('click');
      expect(spy.calledOnce).to.equal(true);
      spy.restore();
    });
  });
});
