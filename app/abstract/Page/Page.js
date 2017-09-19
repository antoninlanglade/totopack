import React from 'react';

export default class Page extends React.Component {
  preload () {
    return new Promise((resolve, reject) => {
      resolve();
    }).catch((err) => { throw new Error(err); });
  }

  animateIn () {
    return new Promise((resolve, reject) => {
      resolve();
    }).catch((err) => { throw new Error(err); });
  }

  animateOut () {
    return new Promise((resolve, reject) => {
      resolve();
    }).catch((err) => { throw new Error(err); });
  }

  render () {
    return <div/>;
  }
}
