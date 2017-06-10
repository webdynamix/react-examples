import Mixpanel from 'react_common/helpers/mixpanel';

function concat(array, add) {
  return array.concat(add);
}

function mixpanelSetup() {
  const models = ['outfitId', 'publisherId', 'sessionIdentifier', 'referralUrl'];

  const newMixpanel = new Mixpanel({
    token: '8e02e4feef228ce5b4510598cc7344d0',
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
