import Ember from 'ember';

const {
  guidFor
  } = Ember;

export default function identity(item) {
  let key;
  let type = typeof item;

  if (type === 'string' || type === 'number') {
    key = item;
  } else {
    key = guidFor(item);
  }

  return key;
}
