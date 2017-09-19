import throttle from 'lodash/throttle';
import Store from './Store';
import Log from 'tools/Log';

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
    Store.set('resize', { width: window.innerWidth, height: window.innerHeight });
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
