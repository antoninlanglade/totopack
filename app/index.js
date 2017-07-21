import Log from 'tools/Log';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import i18n from 'abstract/i18n/i18n';
import Router from 'abstract/Router/Router';
import Main from './Main';
import TweenMax from 'gsap';

require('./main.scss');
require('normalize.css');

// Render React App
const render = (Component) => {
  return ReactDOM.render(
    <Component/>,
    document.getElementById('app')
  );
};

let reactApp = render(App);

// Localized files
const FILES = ['test']

Main
  .use(i18n, { locales: window.locales, files: FILES })
  .use(Router, { app: reactApp, path: window.path })
  .start(() => {
    Log('App', 'setup success', 1);
    Router.start();
  });
