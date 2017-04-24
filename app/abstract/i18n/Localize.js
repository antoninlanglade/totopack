import React from 'react';
import i18n from 'abstract/i18n/i18n';

export default class Localize extends React.Component {
	constructor(props) {
		super(props);
		this.onLocaChange = this.onLocaChange.bind(this);
		
		this.state = {
			localization: i18n.localize(this.props.children)
		}
		
	}

	componentDidMount() {
		i18n.add(this.onLocaChange);
	}

	componentWillUnmount() {
		i18n.remove(this.onLocaChange);
	}

	onLocaChange() {
		this.setState({
			localization: i18n.localize(this.props.children)
		});
	}

	render() {
		return <span>{this.state.localization}</span>
	}
}