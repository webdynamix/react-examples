require('es6-promise').polyfill();

const initialState = {
  ads: {
    left: false,
    right: false,
  }
};

export default function content(state = {}, action, initial = null) {
  let response;

  if (!!initial) {
    return initialState;
  }

  switch (action.type) {

    case 'OUTFITID_SAVEddd' :
      response = Object.assign({}, state, {
        outfitId: action.value,
      });
      break;

    default:
      response = state;
      break;
  }
  return response;
}
