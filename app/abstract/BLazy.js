import bLazy from 'blazy';
import Signal from 'signals';

const BLazySignal = new Signal();

const BLAZY = new bLazy({
	selector: '.b-lazy',
	success : (e) => {
		BLazySignal.dispatch(e);
	}
});	

export {BLAZY, BLazySignal};