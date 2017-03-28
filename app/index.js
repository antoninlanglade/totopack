require('./main.scss');
require('normalize.css');

import React from 'react';
import ReactDOM from 'react-dom';
import Config from 'config/config';
import App from 'components/App';
import i18n from 'abstract/i18n/i18n';
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

const render = (Component) => {
  return ReactDOM.render(
	<Component/>,
    document.getElementById('app')
  );
};
let reactApp = render(App);

main
	.use(i18n, { locales: window.locales, files : ['test'] })
	.use(Router, { app: reactApp, path: window.path})
	.start(() => {
		console.log('%c[App] setup success', Config.successLog)
		Router.start();
	});

