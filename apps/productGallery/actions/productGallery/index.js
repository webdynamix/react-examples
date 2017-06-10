import fetch from 'react_common/helpers/fetch';

export function galleryRequestSuccess(payload) {
  return {
    type: 'GALLERY_REQUEST_SUCCESS',
    payload: payload,
  };
}

export function sentFailure(error) {
  return {
    type: 'GALLERY_REQUEST_FAILURE',
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function sendRequest() {
  return {
    type: 'GALLERY_SEND_REQUEST'
  };
}

export function getOutfitProductGallery(p) {
  const uri = `/widget/outfit/get?id=${p.outfit_id}&pid=${p.pub_id}&r=${p.referrer}`;
  return (dispatch) => {
    dispatch(sendRequest());
    fetch.get(uri).then((response) => {
      if (response.status === 200) {
        dispatch(galleryRequestSuccess(response.payload));
      } else {
        dispatch(sentFailure(response));
      }
    });
  };
}
