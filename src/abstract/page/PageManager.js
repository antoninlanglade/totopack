import React from 'react';
import { findDOMNode } from 'react-dom';

export default class PageManager extends React.Component {
  page = React.createRef()

  constructor (props) {
    super(props);

    this.state = {
      component: 'div',
      params: null
    }
  }

  componentDidMount () {
    this.$page = findDOMNode(this.page.current) //eslint-disable-line
  }

  componentWillUnmount () {
    this.$page = null
  }

  preload () {
    return this.page.current.preload();
  }

  animateIn () {
    return this.page.current.animateIn();
  }

  animateOut () {
    return this.page.current.animateOut();
  }

  setComponent (component, params, cb) {
    return new Promise((resolve, reject) => {
      this.setState({
        component: component ? component : this.state.component,
        params: params ? params : this.state.params
      }, () => {
        this.$page = findDOMNode(this.page.current) //eslint-disable-line
        resolve();
      });
    }).catch((err) => { throw new Error(err); });
  }

  setIndex (index) {
    this.$page.style.zIndex = index //eslint-disable-line
  }

  destroy () {
    this.setState({
      component: 'div',
      params: null
    });
  }

  render () {
    return (
      <this.state.component {...this.state.params} className="page" ref={this.page}/>
    );
  }
}
