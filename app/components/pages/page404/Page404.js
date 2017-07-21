require('./Page404.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import Page from 'abstract/Page/Page';

class Page404 extends Page {
  constructor() {
    super();

  }

  componentDidMount() {

  }

  render() {
    return <div className="page404">
      PAGE 404
    </div>;
  }
}

export default Page404;
