
import React from 'react';
import { shallow } from 'enzyme';

import 'isomorphic-fetch';
import Header from './index.jsx';
// import fetchMock from 'fetch-mock';

describe('Header component', () => {
  describe('render', () => {
    let Component;

    let testData = {
      name: 'test'
    };

    beforeEach(() => {
      Component = shallow(
        <Header
          exact={testData}
          similar={testData}
          budget={testData}
        />);
    });

    it('should show a header', () => {
      expect(Component.find('header').length).to.equal(1);
    });
    it('should show three divs with data-match-type in the header', () => {
      expect(Component.find('header').find('li').length).to.equal(3);
    });
    it('should show three h1 tags', () => {
      expect(Component.find('h1').length).to.equal(3);
    });
    it('should show three h2 tags if there are matches', () => {
      expect(Component.find('h2').length).to.equal(3);
    });
    it('should show no h2 tags if there are no matches', () => {
      Component.setProps({ exact: {}, similar: {}, budget: {} });
      expect(Component.find('h2').length).to.equal(0);
    });
  });
});
