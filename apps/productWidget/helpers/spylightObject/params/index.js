
function getParameterByName(name, url) {
  const _name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${_name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getParams() {
  const params = {};
  const widgetScriptRegEx = new RegExp(/widget\/embed_gallery\.js/);
  const allScriptsArray = [].slice.call(document.scripts);
  const spylightScripts = allScriptsArray.filter((script) => {
    return widgetScriptRegEx.test(script.src);
  });

  const spylightScript = spylightScripts[0];
  // should use !spylightScript instead?
  if (spylightScript === undefined) return null;

  params.publisherId = getParameterByName('pub_id', spylightScript.src);
  params.singleWidget = getParameterByName('container', spylightScript.src);

  return params;
}

export default getParams;
