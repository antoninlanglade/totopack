/* global fetch */
import Navigo from 'navigo';
import i18n from 'abstract/i18n/i18n';
import forEach from 'lodash/forEach';
import Log from 'tools/log';
import Emitter from 'tiny-emitter';

class Router extends Emitter {
  constructor () {
    super();
    this.use = this.use.bind(this);
    this.notFound = this.notFound.bind(this);
    this.setAppPage = this.setAppPage.bind(this);
    this.getRoute = this.getRoute.bind(this);
    this.start = this.start.bind(this);
    this.firstPage = true;
    this.isPaused = false;
  }

  use (config) {
    return new Promise((resolve, reject) => {
      // Path reference
      this.path = config.baseDir;
      this.router = new Navigo(this.path);
      // Fetch all routes
      this.fetchRoutes().then(() => resolve(config)).catch((e) => reject(new Error(e)));
      Log('App', 'use router');
    }).catch((err) => { throw new Error(err); });
  }

  // Launch router listening
  start () {
    this.router.resolve();
  }

  pause () {
    this.router.pause();
    this.isPaused = true;
  }

  resume () {
    this.router.resume();
    this.isPaused = false;
  }

  fetchRoutes () {
    return new Promise((resolve, reject) => {
      let promises = [];

      // Loop throught locales
      forEach(i18n.locales, (locale) => {
        promises.push(
          fetch('i18n/' + locale + '/routes.json')
            .then((response) => {
              return response.json()
            }).then((routes) => {
              let paramObj = {
                '/': {
                  as: 'defaultRoute',
                  uses: this.defaultRouteHandler.bind(this)
                }
              };
              // Adding all routes for a locale with prefixed name and setPage fn
              forEach(routes, (route, name) => {
                paramObj[route] = {
                  as: locale + '-' + name,
                  uses: this.setAppPage.bind(this, name, locale)
                };
              });
              this.add(paramObj);
              // 404 Hanlder
              this.router.notFound(this.notFound);
            }));
      });

      Promise.all(promises).then(() => resolve()).catch((e) => reject(new Error(e)));
    }).catch((err) => { throw new Error(err); });
  }

  defaultRouteHandler () {
    this.router.navigate(`/${i18n.getLocale()}/`);
  }

  add (route) {
    this.router.on(route);
  }

  remove (route) {
    this.router.off(route);
  }

  getRoute (name, params = {}, locale = i18n.locale) {
    return new Promise((resolve, reject) => {
      let route;
      route = this.router.generate(locale + '-' + name, params);
      resolve(route);
    }).catch((err) => { throw new Error(err); });
  }

  setAppPage (page, locale, params) {
    Log('Router', `goto => ${page} ${locale} ${JSON.stringify(params)}`);
    this.lastRoute = page;
    this.lastParams = params;

    this.pause();
    this.firstPage = false;

    if (locale !== i18n.locale) {
      i18n.setLocale(locale)
        .then(() => this.app.setPage(page, params))
        .then(() => this.resume())
        .then(() => this.emit('change', page))
        .catch((err) => { throw new Error(err); });
    } else {
      this.app.setPage(page, params)
        .then(() => this.resume())
        .then(() => this.emit('change', page))
        .catch((err) => { throw new Error(err); });
    }
  }

  getLastRoute () {
    return this.lastRoute;
  }

  getLastParams () {
    return this.lastParams;
  }

  notFound (params) {
    Log('Router', 'page notfound', 0);
    this.app.setPage('page404', params);
  }

  goto (route) {
    !this.isPaused && this.router.navigate(route);
  }

  destroy () {
    this.router.destroy();
  }
}

export default new Router();
