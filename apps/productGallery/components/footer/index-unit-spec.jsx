import React from 'react';
import { shallow } from 'enzyme';

import 'isomorphic-fetch';
import Footer from './index.jsx';

describe('Footer component', () => {
  describe('render', () => {
    let Component;

    let testData = {
      price: 'test',
      source: 'test',
      name: 'test'
    };

    beforeEach(() => {
      Component = shallow(
        <Footer
          exact={testData}
          similar={testData}
          budget={testData}
        />);
    });

    it('should show a footer', () => {
      expect(Component.find('footer').length).to.equal(1);
    });
    it('should show three li elements in the footer if there is are all three matches', () => {
      expect(Component.find('footer').find('li').length).to.equal(3);
    });
    it('should show three <a> tags in the footer if there is are all three matches', () => {
      expect(Component.find('footer').find('a').length).to.equal(3);
    });

    it('should show three li elements in the footer if there is no exact match', () => {
      Component.setProps({ exact: {} });
      expect(Component.find('footer').find('li').length).to.equal(3);
    });
    it('should show three li elements in the footer if there is no similar match', () => {
      Component.setProps({ similar: {} });
      expect(Component.find('footer').find('li').length).to.equal(3);
    });
    it('should show three li elements in the footer if there is no budget match', () => {
      Component.setProps({ budget: {} });
      expect(Component.find('footer').find('li').length).to.equal(3);
    });

    it('should show a disabled buy button if exact match is sold out', () => {
      Component.setProps({ exact: { price: 'Sold Out' } });
      expect(Component.find('footer').find('a[disabled]').length).to.equal(1);
    });

  });
});
