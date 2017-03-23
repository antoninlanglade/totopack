require('./App.scss');

import React from 'react'; 
import LazyImg from 'components/lazyImg/LazyImg';

const img = "lazy-images/test/panda.jpg";
const img2 = "lazy-images/wallpaper.jpg";

import 'whatwg-fetch';

export default class App extends React.Component {
	constructor() {
		super();
		
	}

	componentDidMount() {
		/*fetch('api/projects/')
			.then(function (response) {
				return response.json()
			}).then(function (json) {
				console.log('parsed json', json)
			}).catch(function (ex) {
				console.log('parsing failed', ex)
			})*/
	}

	render() {
		return <div className="app">
			<LazyImg src={img} />
			<LazyImg src={img2} />
		</div>;
	}
}