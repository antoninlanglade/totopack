import React from 'react';
import Router from 'abstract/Router/Router';

export default class RouterComponent extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			href : ""
		}
		this.sync();
	}

	sync() {
		Router.getRoute(this.props.route, this.props.params).then((route) => {
			this.setState({
				href: route
			});
		});
	}

	onClick(e) {
		e.preventDefault();

		Router.getRoute(this.props.route, this.props.params).then((route) => {
			Router.goto(route);
		});
		
	}

	render() {
		return <a className="link" onClick={this.onClick.bind(this)} href={this.state.href} ref="component">{this.props.children}</a>
	}
}