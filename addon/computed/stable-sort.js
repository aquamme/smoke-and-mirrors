import Ember from 'ember';
import keyForItem from '../utils/key-for-item';
import sortArray from '../lib/sort-array';
import replaceArray from '../lib/replace-array';

const {
  computed,
  A,
  ArrayProxy,
  ObjectProxy
  } = Ember;

export default function stableArrayProperty(arrayKey, sort, keyPath = '@identity') {
  // create the value cache for the array
  let outbound = [];

  // create the computed args array
  let args = [];
  args.push( arrayKey.indexOf('.[]') !== -1 ? arrayKey : arrayKey + '.[]' );

  let fn = () => {
    let inbound = this.get(arrayKey);

    if (!inbound) {
      outbound.length = 0;
      return outbound;
    }

    replaceArray(outbound, inbound);
    if (typeof sort === 'function') {
      outbound.sort(sort);
    } else {
      sortArray(outbound.sort(this.get(sort)));
    }

    return outbound;
  };
  args.push(fn);

  return computed.apply(this, args);
}
