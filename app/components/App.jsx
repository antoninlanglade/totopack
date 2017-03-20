import React from 'react'; 

const img = require('assets/images/stink.png');

export default class App extends React.Component {
	constructor() {
		super();
		
	}
	render() {
		return <div>dijzdijz <img src={img} /></div>;
	}
}