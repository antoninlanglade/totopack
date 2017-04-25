require('./Home.scss');

import React from 'react'; 
import ReactDOM from 'react-dom';
import Page from 'abstract/Page/Page';

import LazyImg from 'components/lazyImg/LazyImg';
import ElasticButton from 'components/elasticButton/ElasticButton';
import RouterComponent from 'abstract/Router/RouterComponent';
import i18n from 'abstract/i18n/i18n';
import Localize from 'abstract/i18n/Localize';
import PreloadAsset from 'abstract/PreloadAsset/PreloadAsset';
import Loader from 'abstract/Assets/Loader';

const img = "lazy-images/test/panda.jpg";
const img2 = "lazy-images/wallpaper.jpg";


class Home extends Page {
	constructor() {
		super();
		this.img = new Image()
		this.img.src = img;
		this.state = {
			loaded : false
		}
	}

	preload()  {
		return new Promise((resolve, reject) => {
			const loader = new Loader({
				onComplete: () => {
					this.setState({
						loaded: true
					}, resolve);
				}
			});
			this.toto = loader.add(img, 'home1');
			this.toto2 = loader.add(img2, 'home2');
			this.toto3 = loader.add(img, 'home3');
			this.toto4 = loader.add(img2, 'home4');
		});
	} 

	animateIn() {
		return new Promise((resolve) => {
			TweenLite.to(this.refs.component, 0.5, {
				opacity: 1,
				onComplete: resolve
			})
		});
	}

	animateOut() {
		return new Promise((resolve) =>  {
			TweenLite.to(this.refs.component, 0.5, {
				opacity: 0,
				onComplete: resolve
			})
		});
	}

	componentDidMount() {
		
	}
 
	componentWillUnmount() {
		
	}

	render() {

		let assets = [];

		if (this.state.loaded) {
			assets = [
				<PreloadAsset key={_.uniqueId()}>{this.toto2}</PreloadAsset>,
				<PreloadAsset key={_.uniqueId()}>{this.toto}</PreloadAsset>,
				<PreloadAsset key={_.uniqueId()}>{this.toto4}</PreloadAsset>,
				<PreloadAsset key={_.uniqueId()}>{this.toto3}</PreloadAsset>
			]
		}

		const links = i18n.locales.map((locale) => {
			if (locale !== i18n.locale) return <RouterComponent key={"route"+locale} route="home" locale={locale}>HOME_{locale}</RouterComponent>
		});

		return <div className="page home" ref="component">
			<RouterComponent route="tete" params={{id : "toto"}}>tete</RouterComponent>
			{links}
			{assets}
			{/*<Localize>toto</Localize>*/}
			{/*<LazyImg src={img} />
			<LazyImg src={img2} />*/}
		</div>;
	}
}

export default Home;