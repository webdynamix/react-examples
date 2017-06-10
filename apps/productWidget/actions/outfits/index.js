import fetch from 'react_common/helpers/fetch';

export function success(payload) {
  return {
    type: 'OUTFIT_PUSH_SUCCESS',
    payload: {
      id: payload.outfit.id,
      outfitImage: payload.outfit.image,
      products: payload.products
    },
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

export function fetchOutfitGallery(p, callback) {
  const uri = `//ad.spylig.ht/embed/gallery?pub_id=${p.pubId}&session_id=${p.sessionId}&outfit_id=${p.outfitId}`;
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
