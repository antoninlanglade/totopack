/* global Detectizr */
import Log from 'tools/log';
import React from 'react';
import i18n from 'abstract/i18n/i18n';
import Router from 'abstract/router/Router';
import Main from './tools/Main';
import Resize from 'tools/resize';
import ReactApp from 'tools/reactApp';
import Config from 'config/index';

require('./main.scss');
require('normalize.css');

Detectizr.detect({detectScreen: false});

window.onload = () => {
  const main = new Main(Config);
  main
    .use(Resize)
    .use(i18n)
    .use(Router)
    .use(ReactApp)
    .use(() => new Promise((resolve) => {
      if (Config.urlLocale === '') Config.urlLocale = i18n.getLocale();
      resolve();
    }))
    .start(() => {
      Log('App', 'setup success', 1);
      Router.start();
    });
}
