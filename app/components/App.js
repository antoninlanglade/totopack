require('./App.scss');

import React from 'react'; 
import ReactDOM from 'react-dom';
import Modules from 'app/Modules';
import Page from 'abstract/Page';
import _ from 'lodash';


class App extends React.Component {
	constructor() {
		super();

		this.setPage = this.setPage.bind(this);

		this.currentPage = 0;
		this.modules = {};
		this.storeChunksFunctions();
		
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
		const pages = this.getPage(),
			current = pages.current,
			next = pages.next;
		
		this.modules[page]((component) => {
			current.destroy();
			
			next.setComponent(component.default, params);
		});
	}

	render() {	
		return <div className="app" ref="app">
			<Page ref="p0"/>
			<Page ref="p1"/>
		</div>;
	}
}

export default App;