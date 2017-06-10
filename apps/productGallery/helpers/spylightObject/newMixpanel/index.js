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
      toggleProductMatchType: concat(models, ['targetProductId', 'referrerProductId', 'referrerMatchType', 'targetMatchType']),
      buyClick: concat(models, ['productId', 'productMatchType']),
      toggleProduct: concat(models, ['referrerProductId', 'targetProductId']),
    }
  });

  return newMixpanel;
}

export default mixpanelSetup;
