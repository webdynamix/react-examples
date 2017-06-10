import React from 'react';
import { shallow, mount } from 'enzyme';

import sinon from 'sinon';
import 'isomorphic-fetch';
import { ProductGallery } from './index.jsx';
import * as actions from '../../actions/productGallery';

describe('ProductGallery component', () => {

  describe('actions', () => {
    it('should dispatch an action when a request is sent', () => {
      const expectedAction = {
        type: 'GALLERY_SEND_REQUEST',
      };
      expect(actions.sendRequest().type).to.equal(expectedAction.type);
    });
    it('should dispatch an action when a success is received', () => {
      const expectedAction = {
        type: 'GALLERY_REQUEST_SUCCESS',
      };
      expect(actions.galleryRequestSuccess().type).to.equal(expectedAction.type);
    });
    it('should dispatch an action when a failure is received', () => {
      const error = { response: { status: '', statusTest: '' } };
      const expectedAction = {
        type: 'GALLERY_REQUEST_FAILURE',
      };
      expect(actions.sentFailure(error).type).to.equal(expectedAction.type);
    });
  });
});
