require('./Product.scss');

import React from 'react'; 
import ReactDOM from 'react-dom';
import Page from 'abstract/Page';

class Product extends Page {
	constructor(props) {
		super();

	}

	componentDidMount() {
		
	}

	render() {
		return <div className="product">
			Product PAGE
		</div>;
	}
}

export default Product;