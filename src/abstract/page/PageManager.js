import React from 'react';
import ReactDOM from 'react-dom';

export default class PageManager extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      component: 'div',
      params: null
    }
  }

  preload () {
    return this.refs.page.preload();
  }

  animateIn () {
    return this.refs.page.animateIn();
  }

  animateOut () {
    return this.refs.page.animateOut();
  }

  setComponent (component, params, cb) {
    return new Promise((resolve, reject) => {
      this.setState({
        component: component ? component : this.state.component,
        params: params ? params : this.state.params
      }, () => {
        resolve();
      });
    }).catch((err) => { throw new Error(err); });
  }

  setIndex (index) {
    ReactDOM.findDOMNode(this.refs.page).style.zIndex = index;
  }

  destroy () {
    this.setState({
      component: 'div',
      params: null
    });
  }

  render () {
    return (
      <this.state.component {...this.state.params} className="page" ref="page"/>
    );
  }
}
