const initialState = {
  isFetching: false,
  productSet: {},
  productSetGallery: {},
  targetMatchType: null,
  ckey: +new Date(),
  eventType: null,
  message: '',
  targetProductId: null,
  productMatchType: null,
  productId: null,
};

export default function content(state = {}, action, initial = null) {
  let response;

  if (!!initial) {
    return initialState;
  }
  switch (action.type) {

    case 'PRODUCT_REQUEST_SUCCESS' :
      response = Object.assign({}, state, {
        isFetching: false,
        key: +new Date(),
        current: action.payload.current,
        targetMatchType: action.payload.current,
        targetProductId: action.payload.currentProductId,
        referrerMatchType: action.payload.current,
        currentProductId: action.payload.currentProductId,
        productId: action.payload.currentProductId,
        productSet: action.payload.products,
        model: action.payload.model,
        productSetGallery: {
          items: action.payload.slides,
        },
      });
      break;

    case 'PRODUCT_TOGGLE_SUCCESS' :
      response = Object.assign({}, state, {
        isFetching: false,
        key: +new Date(),
        targetMatchType: action.payload.current,
        targetProductId: action.payload.currentProductId,
        currentProductId: action.payload.currentProductId,
        productId: action.payload.currentProductId,
        productSet: action.payload.products,
        model: action.payload.model,
        productSetGallery: {
          items: action.payload.slides,
        },
        eventType: 'toggleProduct',
      });

      break;

    case 'SWAP_CURRENT_TYPE' :
      response = Object.assign({}, state, {
        productId: action.value,
        targetProductId: action.value,
        targetMatchType: state.model[action.value].matchType,
        eventType: 'toggleProductMatchType',
      });
      break;

    case 'SWAP_TO_AD_TYPE' :
      response = Object.assign({}, state, {
        targetMatchType: 'ad',
        eventType: null,
      });
      break;

    case 'PRODUCT_SEND_REQUEST' :

      response = Object.assign({}, state, {
        isFetching: true,
        eventType: null,
      });
      break;

    case 'PROUDUCT_REQUEST_FAILURE' :

      response = Object.assign({}, state, {
        validationError: true,
        errorText: action.payload.statusText,
        isFetching: false,
        eventType: null,
      });
      break;

    case 'ON_BUY_CLICK' :
      response = Object.assign({}, state, {
        productId: action.value,
        productMatchType: state.model[action.value].matchType,
        eventType: 'buyClick',
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
