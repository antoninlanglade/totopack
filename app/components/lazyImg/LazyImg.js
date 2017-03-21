require('./LazyImg.scss');

import React from 'react';
import BLazy from 'abstract/BLazy';

export default class LazyImg extends React.Component {
	constructor(props) {
		super();
		
		this.img = props.src;
		this.tinyImg = props.src.replace('lazy-images/','lazy-images-tiny/');
	}

	componentDidMount() {
		BLazy.load(this.refs.img, true);
	}
	
	render() {
		return <img ref="img" className="b-lazy b-lazy--img" src={this.tinyImg} data-src={this.img}/>
	}
}