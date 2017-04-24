require('./main.scss');
require('normalize.css');

import React from 'react';
import ReactDOM from 'react-dom';
import Config from 'config/config';
import App from 'components/App';
import i18n from 'abstract/i18n/i18n';
import Router from 'abstract/Router/Router';
import Main from './Main';

// Render React App
const render = (Component) => {
  return ReactDOM.render(
	<Component/>,
    document.getElementById('app')
  );
};

let reactApp;

// Localized files
const FILES = ["test"]

Main
	.use(i18n, { locales: window.locales, files : FILES})
	.use(Router, { app: reactApp = render(App), path: window.path})
	.start(() => {
		console.log('%c[App] setup success', Config.successLog)
		Router.start();
	});

