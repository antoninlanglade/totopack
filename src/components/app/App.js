import React from 'react';
import Modules from 'modules';
import Router from 'abstract/router/Router';
import PageManager from 'abstract/page/PageManager';
import PreLoader from 'abstract/preLoader/preLoader';
import config from 'config'
import ga from 'utils/ga'

require('./App.scss');

class App extends React.Component {
  constructor () {
    super();
    this.scrollTop = this.scrollTop.bind(this);
    this.setPage = this.setPage.bind(this);

    this.currentPage = 0;
    this.modules = {};

    this.isFirstTime = true;

    this.state = {
      p1: 'div',
      p2: 'div'
    };
  }

  componentDidMount () {
    ga.init()
    this.$app = document.getElementById('app');
    this.$body = document.getElementsByTagName('body')[0];
  }

  updateIndexPage () {
    return (this.currentPage + 1) % 2
  }

  getPage () {
    const nextIndex = this.updateIndexPage();
    const current = this.refs['p' + this.currentPage];
    const next = this.refs['p' + nextIndex];
    this.currentPage = nextIndex;
    return { current, next };
  }

  setPage (page, params) {
    return new Promise((resolve, reject) => {
      Modules[page]((component) => {
        if (this._lastPage === page) {
          this.refs['p' + this.currentPage].setComponent(null, params);
          resolve();
        } else {
          const pages = this.getPage();
          const current = pages.current;
          const next = pages.next;

          if (this.isFirstTime) {
            this.isFirstTime = false;

            Promise.resolve()
              .then(() => next.setComponent(component.default, params))
              .then(() => next.preload())
              .then(() => next.setIndex(2))
              .then(() => this.scrollTop())
              .then(() => next.animateIn())
              .then(() => PreLoader.hide())
              .then(() => Router.resume())
              .then(() => resolve())
              .catch((err) => reject(new Error(err)));
          } else {
            Promise.resolve()
              .then(() => PreLoader.show())
              .then(() => next.setComponent(component.default, params))
              .then(() => next.preload())
              .then(() => current.animateOut())
              .then(() => current.setIndex(1))
              .then(() => next.setIndex(2))
              .then(() => this.scrollTop())
              .then(() => next.animateIn())
              .then(() => current.destroy())
              .then(() => PreLoader.hide())
              .then(() => Router.resume())
              .then(() => resolve())
              .catch((err) => reject(new Error(err)));
          }
        }
        this._lastPage = page;
      });
    }).catch((err) => { throw new Error(err); });
  }

  scrollTop () {
    this.$body.scrollTop = 0;
  }

  render () {
    return <div className='app' ref='app'>
      <div className='pages'>
        <PageManager ref='p0'/>
        <PageManager ref='p1'/>
      </div>
    </div>;
  }
}

export default App;
