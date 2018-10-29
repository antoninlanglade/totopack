import App from 'components/app/App';
import React from 'react';
import reactDOM from 'react-dom';
import Router from 'abstract/router/Router';

function ReactApp () {
  function use (config) {
    return new Promise((resolve) => {
      // Render React App
      let render = (Component) => {
        return reactDOM.render(
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
