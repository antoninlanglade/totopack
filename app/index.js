require('./main.scss');

import React from 'react';
import Config from 'config/config';
import App from './components/App';
import Router from 'abstract/Router/Router';
import waterfall from 'run-waterfall';


class Main {
	
	constructor() {
		this.bundles = [];
	}

	use(bundle, conf = {}) {
		
		this.bundles.push(function(next) {
			bundle.use(conf).then(next);
		});
		return this;
	}

	start(cb) {
		waterfall(this.bundles, cb);
	}

}

var main = new Main();
var reactApp = new App();

main.use(Router, {})
	.use(reactApp, {})
	.start(() => console.log('%c[App] setup success', Config.successLog))

