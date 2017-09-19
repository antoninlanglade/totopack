import App from 'components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'abstract/Router/Router';

function ReactApp () {
  function use (config) {
    return new Promise((resolve) => {
      // Render React App
      let render = (Component) => {
        return ReactDOM.render(
          <Component/>,
          document.getElementById('app')
        );
      };
      let app = render(App);
      Router.app = app;
      resolve(config);
    }).catch((err) => { throw new Error(err); });
  }
  return {
    use
  };
}

export default ReactApp();
