require('./Tete.scss');

import React from 'react'; 
import ReactDOM from 'react-dom';
import Page from 'abstract/Page';

class Tete extends Page {
	constructor(props) {
		super();
		console.log(props);
	}

	componentDidMount() {
		
	}

	render() {
		return <div className="tete">
			TETE PAGE
		</div>;
	}
}

export default Tete;