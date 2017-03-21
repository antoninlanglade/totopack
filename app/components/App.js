require('./App.scss');

import React from 'react'; 
import LazyImg from 'components/lazyImg/LazyImg';

const img = "lazy-images/test/panda.jpg";
const img2 = "lazy-images/wallpaper.jpg";

export default class App extends React.Component {
	constructor() {
		super();
		
	}

	componentDidMount() {
		
	}

	render() {
		return <div className="app">
			<LazyImg src={img} />
			<LazyImg src={img2} />
		</div>;
	}
}