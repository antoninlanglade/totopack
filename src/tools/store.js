import Actions from './Actions';

const NS = '__STORE.';
const store = {};

const Store = {
  watch (k, cb) {
    Actions.on(NS + k, cb);
  },
  watchOnce (k, cb) {
    Actions.once(NS + k, cb);
  },
  unwatch (k, cb) {
    Actions.off(NS + k, cb);
  },
  get (k) {
    return store[k];
  },
  set (k, val) {
    store[k] = val;
    Actions.dispatch(NS + k, val);
  }
};

export default Store;
