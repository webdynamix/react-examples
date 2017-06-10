/* eslint no-nested-ternary: 0 */
import fetch from 'react_common/helpers/fetch';

function slide(p, matchType) {
  return {
    type: 'image',
    matchType: matchType,
    src: p.image,
    id: p.id,
  };
}

function reOrderElement(arr, indexA, indexB) {
  const array = arr;
  const tmp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = tmp;
}

function productsModel(payload) {
  const slides = [];
  // TODO: BUILD SLIDES ARRAY AT COMPONENT LEVEL
  Object.keys(payload.products).map((key) => {
    if (payload.products[key].hasOwnProperty('id')) slides.push(slide(payload.products[key], key));
    return null;
  });

  if (slides.length > 1) {
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].matchType === 'exact' && i === 0) reOrderElement(slides, 0, 1);
    }
  }

  let model = {};
  Object.keys(payload.products).forEach((key) => {
    const productModel = Object.assign({}, payload.products[key], {
      matchType: key,
    });
    model = Object.assign({}, model, {
      [payload.products[key].id]: productModel
    });
  });

  const newPayload = Object.assign({}, payload, {
    slides: slides,
    model: model,
  });

  return newPayload;
}


export function productSetRequestSuccess(payload) {
  return {
    type: 'PRODUCT_REQUEST_SUCCESS',
    payload: productsModel(payload),
  };
}

export function toggleProductRequestSuccess(payload) {
  return {
    type: 'PRODUCT_TOGGLE_SUCCESS',
    payload: productsModel(payload),
  };
}

export function sentFailure(error) {
  return {
    type: 'PROUDUCT_REQUEST_FAILURE',
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function sendRequest() {
  return {
    type: 'PRODUCT_SEND_REQUEST'
  };
}

export function swapCurrent(id) {
  return {
    type: 'SWAP_CURRENT_TYPE',
    value: id,
  };
}

export function swapToAdType() {
  return {
    type: 'SWAP_TO_AD_TYPE',
  };
}

export function onBuyClick(id) {
  return (dispatch) => {
    dispatch({
      type: 'ON_BUY_CLICK',
      value: id,
    });
  };
}

export function requestProductSet(p, toggleProduct) {
  const uri = `/widget/product/get?id=${p.product_id}&oid=${p.outfit_id}&pid=${p.pub_id}&r=${p.referrer}`;
  return (dispatch) => {
    dispatch(sendRequest());
    fetch.get(uri).then((response) => {
      if (response.status === 200) {
        if (!!toggleProduct) dispatch(toggleProductRequestSuccess(response.payload));
        else dispatch(productSetRequestSuccess(response.payload));
      } else {
        dispatch(sentFailure(response));
      }
    });
  };
}
