import React from 'react';
import ReactDOM from 'react-dom';

export default class Page extends React.Component {
	constructor(props) {
		super(props);
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
	
	render() {
		return <div/>;
	}
}