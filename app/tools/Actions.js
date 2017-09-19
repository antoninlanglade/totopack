// Custom implementation of tiny-emitter
// https://github.com/scottcorgan/tiny-emitter

const actions = {};

const Actions = {
  on,
  once,
  off,
  dispatch
};

function on (name, cb) {
  (actions[name] || (actions[name] = [])).push(cb);
  return this;
}

function once (name, cb) {
  function listener (...args) {
    off(name, listener);
    cb(...args);
  }
  listener._ = cb;
  return on(name, listener);
}

function off (name, cb) {
  const listeners = actions[name];
  const aliveListeners = [];

  if (listeners && cb) {
    for (let i = 0; i < listeners.length; i++) {
      if (listeners[i] !== cb && listeners[i]._ !== cb) {
        aliveListeners.push(listeners[i]);
      }
    }
  }

  aliveListeners.length
    ? (actions[name] = aliveListeners)
    : delete actions[name];
}

function dispatch (name, ...data) {
  const cb = data.length > 1 ? data.pop() : null;
  const listeners = (actions[name] || []).slice();
  if (cb) {
    const promises = [];
    for (let i = 0; i < listeners.length; i++) {
      promises.push(listeners[i](...data));
    }
    Promise.all(promises).then(cb).catch((err) => { throw new Error(err); });
  } else {
    for (let i = 0; i < listeners.length; i++) {
      listeners[i](...data);
    }
  }
}

export default Actions;
