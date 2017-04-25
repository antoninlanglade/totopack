require('./App.scss');

import React from 'react'; 
import ReactDOM from 'react-dom';
import Modules from 'app/Modules';
import PageManager from 'abstract/PageManager';
import _ from 'lodash';
import Router from 'abstract/Router/Router';


class App extends React.Component {
	constructor() {
		super();

		this.setPage = this.setPage.bind(this);

		this.currentPage = 0;
		this.modules = {};
		this.storeChunksFunctions();

		this.isFirstTime = true;

		this.state = {
			p1 : 'div',
			p2 : 'div'
		}
		
	}

	storeChunksFunctions() {
		_.forEach(Modules, (module, name) => {
			this.modules[name] = module;
		});
	}

	updateIndexPage() {
		return (this.currentPage + 1) % 2
	}

	getPage() {
		const nextIndex = this.updateIndexPage();
		const current = this.refs['p' + this.currentPage];
		const next = this.refs['p' + nextIndex];
		this.currentPage = nextIndex;
		return {current, next};
	}

	setPage(page, params) {
		Router.pause();
		this.modules[page]((component) => {
			if (this._lastPage === page) {
				this.refs['p' + this.currentPage].setComponent(null, params);
				Router.resume();
			}
			else {
				const pages = this.getPage(),
					current = pages.current,
					next = pages.next;

				if (this.isFirstTime) {
					this.isFirstTime = false;
					Promise.resolve()
						.then(() => next.setComponent(component.default, params))
						.then(() => next.preload())
						.then(() => current.setIndex(2))
						.then(() => next.animateIn())
						.then(() => Router.resume())
				}
				else {
					Promise.resolve()
						.then(() => next.setComponent(component.default, params))
						.then(() => next.preload())
						.then(() => current.animateOut())
						.then(() => current.setIndex(1))
						.then(() => next.setIndex(2))
						.then(() => next.animateIn())
						.then(() => current.destroy())
						.then(() => Router.resume())
				}
			}
			this._lastPage = page;
		});
	}

	render() {	
		return <div className="app" ref="app">
			<PageManager ref="p0"/>
			<PageManager ref="p1"/>
		</div>;
	}
}

export default App;