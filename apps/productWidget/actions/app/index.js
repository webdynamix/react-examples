import fetch from 'react_common/helpers/fetch';
const host = process.env.HOST;

export function success(payload) {
  return {
    type: 'OUTFIT_GALLERY_SUCCESS',
    payload: payload,
  };
}

export function sendRequest() {
  return {
    type: 'OUTFIT_GALLERY_REQUEST',
  };
}

export function failure(response) {
  return {
    type: 'OUTFIT_GALLERY_FAILURE',
    value: response,
  };
}

export function outfitIdSave(id) {
  return (dispatch) => {
    dispatch({
      type: 'OUTFITID_SAVE',
      value: id,
    });
  };
}

export function productIdDidChange(value) {
  return (dispatch) => {
    dispatch({
      type: 'PRODUCTID_DID_CHANGE',
      value: value,
    });
  };
}

export function modalManualClose() {
  return (dispatch) => {
    dispatch({
      type: 'MODAL_MANUAL_CLOSE',
    });
  };
}

export function modalAutoClose() {
  return (dispatch) => {
    dispatch({
      type: 'MODAL_AUTO_CLOSE',
    });
  };
}


export function fetchGallery(p, callback) {
  const uri = `${host}/embed/gallery?pub_id=${p.pubId}&session_id=${p.sessionId}&outfit_id=${p.outfitId}`;
  return (dispatch) => {
    dispatch(sendRequest());
    fetch.get(uri).then((response) => {
      if (response.status === 200) {
        dispatch(success(response.payload));
        callback(response.payload.products.length);
      } else {
        dispatch(failure(response));
      }
    });
  };
}
