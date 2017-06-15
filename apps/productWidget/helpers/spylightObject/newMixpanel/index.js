import Mixpanel from 'react_common/helpers/mixpanel';

function concat(array, add) {
  return array.concat(add);
}

function mixpanelSetup() {
  const models = ['outfitId', 'publisherId', 'sessionIdentifier', 'referralUrl'];

  const newMixpanel = new Mixpanel({
    token: 'TOKEN',
    models: {
      error: concat(models, ['message']),
      closeModal: concat(models, ['manualClose']),
      galleryLoad: models,
      openModal: concat(models, ['productId']),
    }
  });

  return newMixpanel;
}

export default mixpanelSetup;
