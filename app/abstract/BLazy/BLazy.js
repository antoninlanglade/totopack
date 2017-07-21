import BLazy from 'blazy';
import Signal from 'signals';

const BLazySignal = new Signal();

const BLAZY = new BLazy({
  selector: '.b-lazy',
  success: (e) => {
    BLazySignal.dispatch(e);
  }
});

export {BLAZY, BLazySignal};
