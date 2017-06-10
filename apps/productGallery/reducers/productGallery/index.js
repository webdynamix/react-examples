require('es6-promise').polyfill();

const initialState = {
  gallery: [],
  isFetching: false,
};

export default function content(state = {}, action, initial = null) {
  let response;

  if (!!initial) {
    return initialState;
  }

  switch (action.type) {

    case 'GALLERY_REQUEST_SUCCESS' :

      response = Object.assign({}, state, {
        isFetching: false,
        gallery: action.payload.products,
      });
      break;

    case 'GALLERY_SEND_REQUEST' :

      response = Object.assign({}, state, {
        isFetching: true,
      });
      break;

    case 'GALLERY_REQUEST_FAILURE' :

      response = Object.assign({}, state, {
        validationErråor: true,
        errorText: action.payload.statusText,
        isFetching: false,
      });
      break;

    default:
      response = state;
      break;
  }
  return response;
}
