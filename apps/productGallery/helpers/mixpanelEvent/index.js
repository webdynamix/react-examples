function combine(argumentss) {
  const o = {};
  for (let i = 0; i < argumentss.length; i++) {
    const arg = argumentss[i];
    if (typeof arg !== 'object') continue;
    for (const p in arg) {
      if (arg.hasOwnProperty(p)) o[p] = arg[p];
    }
  }
  return o;
}

function combinedStore(store, eventType) {
  const arr = [];
  Object.keys(store).map((key) => {
    arr.push(store[key]);
    return null;
  });

  const combined = Object.assign({}, combine(arr), {
    eventType: eventType
  });

  return combined;
}

function mixpanelEvent(store) {
  Object.keys(store).map((key) => {
    if (store[key].hasOwnProperty('eventType') && !!store[key].eventType) {
      window.spylight.mixpanel.track(combinedStore(store, store[key].eventType));
    }
    return null;
  });
}

export default mixpanelEvent;
