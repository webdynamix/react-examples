import generateUid from 'react_common/helpers/guid';
import JS from 'react_common/helpers/library';
import pushReducers from 'helpers/pushReducers';
import newMixpanel from './newMixpanel';
import getParams from './params';

class Spylight {

  constructor(props) {
    this.super = props;
    this.params = getParams();

    const windowSpylight = {
      publisherId: this.params.publisherId,
      sessionId: generateUid(),
      mixpanel: newMixpanel(),
      components: ['app', 'modal'],
      reducers: [],
    };

    if (window.spylight && typeof window.spylight === 'object') {
      window.spylight = Object.assign({}, window.spylight, windowSpylight);
    } else {
      window.spylight = windowSpylight;
    }

    pushReducers(window.spylight);
  }

  buildGallery(node) {
    const collection = node.getAttribute('data-spy-gallery').split(',');
    const id = collection[0];
    node.setAttribute('id', `sp_${id}`);
    return { id: id, container: `sp_${collection[0]}`, gallery: collection };
  }

  buildOutfit(node) {
    const id = node.getAttribute('data-spy-id');
    node.setAttribute('id', `sp_${id}`);
    return { id: id, container: `sp_${id}` };
  }

  buildObject(node) {
    const klass = node.className.split('-');
    const fn = JS.capitalize(klass[klass.length - 1]);
    return this[`build${fn}`](node);
  }

  bootstrap(callback) {
    const embedTypes = ['.spylight-outfit', '.spylight-gallery'];

    const shouldPushItem = (elements, item) => {
      for (let i = elements.length; --i >= 0;) {
        if (elements[i].id === item.id) {
          return false;
        }
      }
      return true;
    };

    const queryElements = (types, i) => {
      let attempts = 120;
      const elements = [];

      const ready = setInterval(() => {
        const nodes = document.querySelectorAll(types[i]);

        for (let key = 0; key < nodes.length; key ++) {
          const item = this.buildObject(nodes[key]);
          if (!!shouldPushItem(elements, item)) {
            elements.push(item);
            callback(item);
          }
        }

        if (!attempts) {
          clearInterval(ready);
        }

        attempts--;
      }, 500);
    };

    for (let i = embedTypes.length; --i >= 0;) {
      queryElements(embedTypes, i);
    }
  }

}

export default new Spylight;
