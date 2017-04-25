require('./Tete.scss');

import React from 'react'; 
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Page from 'abstract/Page/Page';
import Loader from 'abstract/Assets/Loader';
import PreloadAsset from 'abstract/PreloadAsset/PreloadAsset';
import RouterComponent from 'abstract/Router/RouterComponent';

const img = "lazy-images/test/panda.jpg";
const img2 = "lazy-images/wallpaper.jpg";

class Tete extends Page {
	constructor(props) {
		super();
		this.state = {
			loaded : false
		};
	}

	componentDidMount() {
		
	}

	animateIn() {
		return new Promise((resolve) =>  {
			TweenLite.to(this.refs.component, 0.5, {
				opacity: 1,
				onComplete: resolve
			})
		});
	}

	animateOut() {
		return new Promise((resolve) => {
			TweenLite.to(this.refs.component, 0.5, {
				opacity : 0,
				onComplete : resolve
			})
		});
	}

	preload() {
		return new Promise((resolve, reject) => {
			const loader = new Loader({ onComplete: () => {
				this.setState({
					loaded : true
				}, resolve);
			}});
			this.toto = loader.add(img);
			this.toto2 = loader.add(img2);
			this.toto3 = loader.add(img);
			this.toto4 = loader.add(img2);
		});
	} 

	render() {
		let assets = [];
		
		if (this.state.loaded) {
			assets = [
				<PreloadAsset key={_.uniqueId()}>{this.toto}</PreloadAsset>,
				<PreloadAsset key={_.uniqueId()}>{this.toto2}</PreloadAsset>,
				<PreloadAsset key={_.uniqueId()}>{this.toto3}</PreloadAsset>,
				<PreloadAsset key={_.uniqueId()}>{this.toto4}</PreloadAsset>
			]
		}
		return <div className="page tete" ref="component">
			<RouterComponent route="home" >home</RouterComponent>
			{assets}
		</div>;
	}
}

export default Tete;