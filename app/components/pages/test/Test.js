import React from 'react';
import Page from 'abstract/Page/Page';
import RouterComponent from 'abstract/Router/RouterComponent';

const style = require('./Test.scss');

class Test extends Page {
  render () {
    return <div className='test page'>
      Test
      <RouterComponent route="home">home</RouterComponent>
    </div>;
  }
}

export default Test;
