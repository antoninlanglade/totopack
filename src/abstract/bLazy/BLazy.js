import BLazy from 'blazy';

const callbacks = new Map();

const blazyInstance = new BLazy({
  selector: '.b-lazy',
  success: (e) => {
    if (!callbacks.has(e)) return false;
    else {
      callbacks.get(e)(e);
      callbacks.delete(e);
    }
  }
});

function load (el, cb) {
  callbacks.set(el, cb);
  blazyInstance.load(el, true);
};

function destroy (el) {
  callbacks.delete(el);
};

export default { load, destroy };
