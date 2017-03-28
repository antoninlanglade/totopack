import Navigo from 'navigo';
import i18n from 'abstract/i18n/i18n';
import _ from 'lodash';
import Config from 'config/config';

class Router {
	constructor() {

		this.use = this.use.bind(this);
		this.notFound = this.notFound.bind(this);
		this.setAppPage = this.setAppPage.bind(this);
		this.start = this.start.bind(this);
	}

	use(config) {
		return new Promise((resolve, reject) => {
			this.app = config.app;
			// Path reference
			this.path = window.location.origin + config.path;
			this.router = new Navigo(this.path);
			
			// Fetch all routes
			this.fetchRoutes()
					.then(() => resolve())
					.catch(() => reject());

		});
	}

	start() {
		// Launch router listening
		this.router.resolve();
	}

	fetchRoutes() {
		return new Promise((resolve, reject) => {
			let promises = [];
			// Loop throught locales
			_.forEach(i18n.locales, (locale) => {
				promises.push(
					fetch('i18n/' + locale + '/routes.json')
						.then((response) => {
							return response.json()
						}).then((routes) => {
							let paramObj = {};
							// Adding all routes for a locale with prefixed name and setPage fn
							_.forEach(routes, (route, name) =>{
								paramObj[route] = { as: locale + '-' + name, uses: this.setAppPage.bind(this, name) };
							});
							this.add(paramObj);
							// 404 Hanlder
							this.router.notFound(this.notFound);
						}));
			});
			
			Promise.all(promises)
						.then(() => resolve())
						.catch(() => reject());
		});
		
	}

	add(route) {
		this.router.on(route);
	}	

	remove(route) {
		
	}

	getRoute(name, params = undefined, locale) {
		return new Promise((resolve, reject) => {
			let route;
			
			if (locale) {
				i18n.setLocale(locale)
					.then(() => {
						route = this.router.generate(locale + '-' + name, params);
						console.log(route);
						resolve(route);
					});
			}
			else {
				route = this.router.generate(i18n.locale + '-' + name, params);
				console.log(i18n.locale + '-' + name);
				resolve(route);
			}
		});
	} 

	injectParams (route, params) {
		let routeWithParams = "";
		let splitRoute = route.split('/');
		let currentParam, splitItem;
		for (let i = 0; i < splitRoute.length; i++) {
			splitItem = splitRoute[i];
			if (splitItem[0] === ":") {
				// Conditional
				if (splitItem[splitItem.length - 1] === "?")  {
					currentParam = splitItem.slice(1, splitItem.length - 1);
					if (params[currentParam]) {
						routeWithParams += params[currentParam] + '/'
					}
				}
				// Required
				else {
					currentParam = splitItem.slice(1, splitItem.length);
					routeWithParams += params[currentParam] + '/';
				}
			}
			else {
				routeWithParams += splitItem + '/';
			}
		}

		return routeWithParams;
	}

	setAppPage(page, params) {
		console.log('[Router] goto =>', page);
		this.app.setPage(page, params);
	}

	notFound(params) {
		console.log('%c[Router] page notfound', Config.failedLog);
		this.app.setPage('page404', params);
	}
	
	goto(route) {
		this.router.navigate(route);
	}

	destroy() {
		this.router.destroy();
	}
}

export default new Router();

