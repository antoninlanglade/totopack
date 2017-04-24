require('./Home.scss');

import React from 'react'; 
import ReactDOM from 'react-dom';
import Page from 'abstract/Page';

import LazyImg from 'components/lazyImg/LazyImg';
import ElasticButton from 'components/elasticButton/ElasticButton';
import RouterComponent from 'abstract/Router/RouterComponent';
import i18n from 'abstract/i18n/i18n';
import Localize from 'abstract/i18n/Localize';

const img = "lazy-images/test/panda.jpg";
const img2 = "lazy-images/wallpaper.jpg";

class Home extends Page {
	constructor() {
		super();
		
	}

	componentDidMount() {
		
	}

	render() {

		const links = i18n.locales.map((locale) => {
			if (locale !== i18n.locale) return <RouterComponent key={"route"+locale} route="home" locale={locale}>HOME_{locale}</RouterComponent>
		})
		return <div className="home">

			<RouterComponent route="tete" params={{id : "toto"}}>tete</RouterComponent>
			{links}
			<Localize>toto</Localize>
			<LazyImg src={img} />
			<LazyImg src={img2} />
		</div>;
	}
}

export default Home;