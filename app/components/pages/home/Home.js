import React from 'react';
import Page from 'abstract/Page/Page';
import RouterComponent from 'abstract/Router/RouterComponent';

const style = require('./Home.scss');

class Home extends Page {
  render () {
    return <div className='home page'>
      HOME
      <RouterComponent route="test">test</RouterComponent>
    </div>;
  }
}

export default Home;
