import React from 'react';
import Page from 'abstract/page/Page';
import RouterComponent from 'abstract/router/RouterComponent';

require('./Test.scss');

class Test extends Page {
  render () {
    return <div className='test page'>
      Test
      <RouterComponent route="home">home</RouterComponent>
    </div>;
  }
}

export default Test;
