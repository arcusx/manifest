const noop = () => {
};

class History {
  constructor() {
    window.onpopstate = (ev) => this._onPopState(ev);
  }

  _onPopState(ev) {
    const path = this._getHash();
    (this.onStateChange || noop)(path);
  }

  _getHash() {
    if (document.location.hash === '') {
      return '';
    }

    return document.location.href.match(/[^#]#(.*)$/)[1];
  }

  pushState(path) {
    window.location = '#' + path;
  }
}

export const history = new History();
