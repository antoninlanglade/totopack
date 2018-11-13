import throttle from 'lodash/throttle';
import store from './store';
import Log from 'tools/log';

function Resize () {
  let resizeDebounce = throttle(resize, 200);

  function use (config) {
    return new Promise((resolve) => {
      init();
      Log('App', 'use resize');
      resolve(config);
    }).catch((err) => { throw new Error(err); });
  }

  function resize (e) {
    store.set('resize', { width: window.innerWidth, height: window.innerHeight });
  }

  function init () {
    resize();
    window.addEventListener('resize', resizeDebounce);
  }

  function remove () {
    window.removeEventListener('resize', resizeDebounce);
  }

  return {
    use,
    init,
    remove
  };
}
export default Resize();
