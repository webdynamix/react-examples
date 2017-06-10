const injectStysheet = (href) => {
  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');

  for (let i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].href === href) {
      return;
    }
  }

  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = href;
  head.appendChild(link);
};

export default injectStysheet;
