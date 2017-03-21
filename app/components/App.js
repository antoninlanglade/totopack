require('./App.scss');

import React from 'react'; 
import LazyImg from 'components/lazyImg/LazyImg';

const img = "images/test/panda.jpg";


export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			second: null
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				second: <LazyImg src={img} />
			});
		}, 1000);
	}

	render() {
		return <div className="app">
			<LazyImg src={img} />
			{this.state.second}
		</div>;
	}
}