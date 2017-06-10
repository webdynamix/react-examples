require('es6-promise').polyfill();

const initialState = {
  gallery: [],
  isFetching: false,
  openModal: false,
  eventType: null,
  referralUrl: document.location.href,
  sessionIdentifier: window.spylight.sessionId,
  publisherId: window.spylight.publisherId,
  productId: null,
  manualClose: 0,
  message: null,
  klass: '',
  cta: 'Find the Look',
  ctaButton: 'Explore Outfit',
  outfits: [],
};

export default function content(state = {}, action, initial = null) {
  let response;

  if (!!initial) {
    return initialState;
  }

  switch (action.type) {

    case 'OUTFITID_SAVE' :
      response = Object.assign({}, state, {
        outfitId: action.value,
        eventType: null,
      });
      break;

    case 'OUTFIT_GALLERY_SUCCESS' :
      response = Object.assign({}, state, {
        isFetching: false,
        gallery: action.payload.products,
        eventType: 'galleryLoad',
      });
      break;

    case 'OUTFIT_PUSH_SUCCESS' :
      response = Object.assign({}, state, {
        isFetching: false,
        outfits: state.outfits.concat(action.payload),
        eventType: 'galleryLoad',
      });
      break;

    case 'OUTFIT_GALLERY_REQUEST' :
      response = Object.assign({}, state, {
        isFetching: true,
        eventType: null,
      });
      break;

    case 'OUTFIT_GALLERY_FAILURE' :
      response = Object.assign({}, state, {
        isFetching: false,
        eventType: 'error',
        message: 'gallery failed to load',
      });
      break;

    case 'PRODUCTID_DID_CHANGE' :
      response = Object.assign({}, state, {
        productId: action.value,
        eventType: 'openModal',
        openModal: true,
      });
      break;

    case 'MODAL_MANUAL_CLOSE' :
      response = Object.assign({}, state, {
        openModal: false,
        eventType: 'closeModal',
        manualClose: 1,
        productId: null,
      });
      break;

    case 'MODAL_AUTO_CLOSE' :
      response = Object.assign({}, state, {
        openModal: false,
        eventType: 'closeModal',
        manualClose: 0,
        productId: null,
      });
      break;

    default:
      response = Object.assign({}, state, {
        eventType: null,
      });
      break;
  }
  return response;
}
