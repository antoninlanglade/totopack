require('./App.scss');

import React from 'react'; 
import ReactDOM from 'react-dom';
import LazyImg from 'components/lazyImg/LazyImg';
import RouterComponent from 'abstract/Router/RouterComponent';

const img = "lazy-images/test/panda.jpg";
const img2 = "lazy-images/wallpaper.jpg";

class App extends React.Component {
	constructor() {
		super();
		
	}

	use(config) {
		return new Promise((resolve, reject) => {
			const renderComponent = Component => ReactDOM.render(React.createElement(Component), document.getElementById('app'), resolve);
			renderComponent(App);

			if (module.hot) module.hot.accept(App, () => {
				renderComponent(App);
			});
		});
	}

	componentDidMount() {
		
	}

	render() {
		return <div className="app">
			<RouterComponent route="/tete">tete</RouterComponent>
			<LazyImg src={img} />
			<LazyImg src={img2} />
		</div>;
	}
}

export default App;