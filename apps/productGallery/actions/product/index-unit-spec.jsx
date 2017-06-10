import 'isomorphic-fetch';
import * as actions from './';
// import fetchMock from 'fetch-mock';

describe('ProductGallery actions', () => {
  it('should dispatch an action when a request is sent', () => {
    const expectedAction = {
      type: 'PRODUCT_SEND_REQUEST',
    };
    expect(actions.sendRequest().type).to.equal(expectedAction.type);
  });
  it('should dispatch an action when a success is received', () => {
    // const expectedAction = {
    //   type: 'PRODUCT_REQUEST_SUCCESS',
    // };
    // expect(actions.productSetRequestSuccess().type).to.equal(expectedAction.type);
  });
  it('should dispatch an action when a failure is received', () => {
    const error = { response: { status: '', statusTest: '' } };
    const expectedAction = {
      type: 'PROUDUCT_REQUEST_FAILURE',
    };
    expect(actions.sentFailure(error).type).to.equal(expectedAction.type);
  });
});
