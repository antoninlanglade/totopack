import Navigo from 'navigo';

class Router {
	constructor() {
		this.use = this.use.bind(this);
	}

	use(conf) {
		return new Promise((resolve, reject) => {
			this.router = new Navigo();
			this.router.notFound(this.notFound);
			this.router.on(resolve).resolve();
		});
	}

	add(route) {

	}

	remove(route) {

	}

	notFound() {
		console.log('notfound');
	}
	
	goto(route) {
		this.router.navigate(route);
	}
}

export default new Router();

