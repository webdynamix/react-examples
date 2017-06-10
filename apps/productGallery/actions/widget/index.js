export function productIdUpdate(id) {
  return {
    type: 'PRODUCT_ID_UPDATE',
    value: id,
  };
}

export function idsUpdate(model) {
  return {
    type: 'INITIAL_MODEL',
    value: model,
  };
}

export function storeParams(id) {
  return (dispatch) => {
    dispatch(idsUpdate(id));
  };
}

export function swapProductId(id) {
  return (dispatch) => {
    dispatch(productIdUpdate(id));
  };
}
