require('./Home.scss');

import React from 'react'; 
import ReactDOM from 'react-dom';
import Page from 'abstract/Page';

import LazyImg from 'components/lazyImg/LazyImg';
import RouterComponent from 'abstract/Router/RouterComponent';
import i18n from 'abstract/i18n/i18n';

const img = "lazy-images/test/panda.jpg";
const img2 = "lazy-images/wallpaper.jpg";

class Home extends Page {
	constructor() {
		super();
		
	}

	componentDidMount() {
		console.log(i18n.localize('test'));
	}

	render() {
		return <div className="home">
			<RouterComponent route="tete" params={{id : "toto"}}>tete</RouterComponent>
			<LazyImg src={img} />
			<LazyImg src={img2} />
		</div>;
	}
}

export default Home;