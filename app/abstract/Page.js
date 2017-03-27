import React from 'react';
import ReactDOM from 'react-dom';

export default class Page extends React.Component {
	constructor() {
		super();
		this.state = {
			component : 'div',
			params : null
		}
	}

	preload() {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}

	animateIn() {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}

	animateOut() {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}
	
	setComponent(component, params, cb) {
		this.setState({
			component : component,
			params : params
		}, cb);
	}

	destroy() {
		this.setState({
			component : 'div'
		});
	}

	render() {
		return (
			<this.state.component {...this.state.params} ref="page"/>
		);
	}
}  