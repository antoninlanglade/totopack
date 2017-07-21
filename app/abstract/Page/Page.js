import React from 'react';

export default class Page extends React.Component {
  preload () {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  animateIn () {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  animateOut () {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  render () {
    return <div/>;
  }
}
