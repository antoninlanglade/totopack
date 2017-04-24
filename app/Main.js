import waterfall from 'run-waterfall';

class Main {
	constructor() {
		this.bundles = [];
	}

	use(bundle, conf = {})  {
		this.bundles.push(function (next) {
			bundle.use(conf).then(next);
		});
		return this;
	}

	start(cb) {
		waterfall(this.bundles, cb);
	}
}

export default new Main();