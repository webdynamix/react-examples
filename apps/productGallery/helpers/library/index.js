class Library {

  closest(el, selector, stopSelector) {
    let retval = null;
    let element = el;
    while (element) {
      if (element.matches(selector)) {
        retval = element;
        break;
      } else if (stopSelector && element.matches(stopSelector)) {
        break;
      }
      element = element.parentElement;
    }
    return retval;
  }

  objectIsEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  isMobile() {
    return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
  }

}

export default new Library();
