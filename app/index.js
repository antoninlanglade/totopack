require('./main.scss');
require('normalize.css');

import React from 'react';
import Config from 'config/config';
import App from 'components/App';
import i18n from 'abstract/i18n';
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

/*Router.add('test', import('components/test'))*/
/*require.ensure(['./components/pages/home/Home.js'], function () {
	const comp = require('./components/pages/home/Home.js')
	console.log(comp)
})*/
/*import('components/pages/home/Home').then((moment) => {
			console.log(moment);
}).catch(function(err) {*/
/*
});
*/
var main = new Main();
var reactApp = new App();

main.use(i18n, { locales: window.locales })
	.use(Router, { app: reactApp, path: window.path})
	.use(reactApp)
	.start(() => console.log('%c[App] setup success', Config.successLog));

