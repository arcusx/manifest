import {EventEmitter} from 'events';
import {appModel} from './AppModel';
import 'setimmediate';

const models = [appModel];

function upperFirst(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export class Dispatcher {
  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  dispatch(action) {
    if (__DEV__) {
      console.log(`dispatching ${action.type}...`);
    }

    this._dispatch(action);
    this._fireChanged();
  }

  _dispatch(action) {
    let handled = false;
    const handlerName = 'handle' + upperFirst(action.type);
    models.forEach((model) => {
      const handler = model[handlerName];
      if (handler) {
        handler.call(model, action);
        handled = true;
      }
    });

    if (!handled) {
      console.warn('Unhandled action: %o', action);
    }
  }

  _fireChanged() {
    const data = {};
    models.forEach((model) => {
      if (model.appendDataTo) {
        model.appendDataTo(data);
      }
    });

    console.debug('Updating UI %o', JSON.parse(JSON.stringify(data)));

    this.eventEmitter.emit('change', {data});
  }

  subscribe(l) {
    this.eventEmitter.addListener('change', l);
    global.setImmediate(() => this._fireChanged());
  }

  unsubscribe(l) {
    this.eventEmitter.removeListener('change', l);
  }
}

export const dispatcher = new Dispatcher();
