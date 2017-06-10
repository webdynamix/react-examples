import generateUid from 'react_common/helpers/guid';
import newMixpanel from './newMixpanel';

class Spylight {

  create(callback) {
    const windowSpylight = {
      sessionId: generateUid(),
      mixpanel: newMixpanel(),
    };
    if (window.spylight && typeof window.spylight === 'object') {
      window.spylight = Object.assign({}, window.spylight, windowSpylight);
    } else {
      window.spylight = windowSpylight;
    }
    callback();
  }

  mixpanel() {
    return window.spylight.mixpanel;
  }

}

export default new Spylight;
