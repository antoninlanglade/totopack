import React from 'react';
import Page from 'abstract/page/Page';
import RouterComponent from 'abstract/router/RouterComponent';

require('./Home.scss');

class Home extends Page {
  render () {
    return <div className='home page'>
      HOME
      <RouterComponent route="test">test</RouterComponent>
    </div>;
  }
}

export default Home;
