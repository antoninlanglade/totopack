require('./LazyImg.scss');

import React from 'react';
import BLazy from 'abstract/BLazy';
const tinySuffix = '-tiny';
const extensionRegex = /^(.*)\.(gif|jpg|jpeg|tiff|png)$/i;

export default class LazyImg extends React.Component {
	constructor(props) {
		super();
		const regex = props.src.match(extensionRegex);
		this.img = props.src;
		this.tinyImg = regex[1] + tinySuffix + '.' + regex[2];
	}

	componentDidMount() {
		BLazy.load(this.refs.img, true);
	}
	
	render() {
		return <img ref="img" className="b-lazy b-lazy--img" src={this.tinyImg} data-src={this.img}/>
	}
}