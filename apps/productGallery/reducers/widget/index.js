require('es6-promise').polyfill();

const initialState = {
  sessionIdentifier: window.spylight.sessionId,
  includeAds: false,
  title: 'Get the Look',
};

export default function content(state = {}, action, initial = null) {
  let response;

  if (!!initial) {
    return initialState;
  }
  switch (action.type) {

    case 'INITIAL_MODEL' :
      response = Object.assign({}, state, {
        outfitId: action.value.outfitId,
        masterProductId: action.value.masterProductId,
        publisherId: action.value.publisherId,
        referrerProductId: action.value.masterProductId,
        referralUrl: action.value.referralUrl,
      });
      break;

    case 'PRODUCT_ID_UPDATE' :
      response = Object.assign({}, state, {
        masterProductId: action.value,
      });
      break;

    default:
      response = state;
      break;
  }
  return response;
}
