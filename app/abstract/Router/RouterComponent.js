import React from 'react';
import Router from 'abstract/Router/Router';

export default class RouterComponent extends React.Component {
	constructor() {
		super();	
	}

	onClick(e) {
		e.preventDefault();
		Router.goto(this.refs.component.getAttribute('href'));
	}

	render() {
		return <a className="link" onClick={this.onClick.bind(this)} href={this.props.route} ref="component">{this.props.children}</a>
	}
}