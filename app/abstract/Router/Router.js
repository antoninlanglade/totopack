import Navigo from 'navigo';
import i18n from 'abstract/i18n';
import _ from 'lodash';


class Router {
	constructor() {
		this.use = this.use.bind(this);
		this.routes = {};
		
		this.setAppPage = this.setAppPage.bind(this);
	}

	use(config) {
		return new Promise((resolve, reject) => {
			this.app = config.app;
			this.path = window.location.origin + config.path;
			this.router = new Navigo(this.path);
			
			this.router.on().resolve();
			this.fetchRoutes()
					.then(resolve)
					.catch(reject);

		});
	}

	fetchRoutes() {
		return new Promise((resolve, reject) => {
			_.forEach(i18n.locales, (locale) => {
				fetch('i18n/' + locale + '/routes.json')
					.then((response) => {
						return response.json()
					}).then((routes) => {
						this.routes[locale] = routes;
						_.forEach(routes, (route, name) =>{
							this.add(route, name);
						});
						
						this.router.notFound(this.notFound);

						resolve();
					}).catch((err) => {
						reject(err);
					});
			});
		});
		
	}

	add(route, name) {
		this.router.on(route, this.setAppPage.bind(this, name)).resolve();
	}
	
	remove(route) {
		
	}

	setAppPage(page) {
		console.log('[Router] goto =>', page);
		this.app.setPage(page);
	}

	notFound() {
		console.log('%c[Router] page notfound', Config.failedLog);
	}
	
	goto(route) {
		this.router.navigate(route);
	}

	destroy() {
		this.router.destroy();
	}
}

export default new Router();

