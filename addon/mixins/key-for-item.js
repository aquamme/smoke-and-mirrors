/* global String */
import Ember from 'ember';
import identity from '../lib/identity';

const {
  get: get,
  Mixin
  } = Ember;

export default Mixin.create({

  key: '@identity',
  keyForItem(item, index) {
    let key;
    let keyPath = this.get('key');

    switch (keyPath) {
      case '@index':
        if (!index) {
          throw "No index was supplied to keyForItem";
        }
        key = index;
        break;
      case '@identity':
        key = identity(item);
        break;
      default:
        if (keyPath) {
          key = get(item, keyPath);
        } else {
          key = identity(item);
        }
    }

    if (typeof key === 'number') {
      key = String(key);
    }

    return key;
  }

});
