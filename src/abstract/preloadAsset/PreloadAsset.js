/* global HTMLImageElement, HTMLVideoElement */
import React from 'react';
import RAF from 'raf';
import BackgroundTools from 'app/tools/Background';

require('./PreloadAsset.scss');

class PreloadAsset extends React.Component {
  constructor (props) {
    super(...arguments);
    this.resize = this.resize.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount () {
    this.refs.dom && this.refs.dom.appendChild(this.props.children);

    if (this.props.size !== void (0) && !this.props.update) {
      this.resize();
      window.addEventListener('resize', this.resize);
    }
    if (this.props.update) {
      this.props.update && RAF.add(this.update);
    }
  }

  componentWillUnmount () {
    this.props.update && RAF.remove(this.update);
    if (this.props.size !== void (0) && !this.props.update) {
      window.removeEventListener('resize', this.resize);
    }
  }

  resize () {
    let size;

    const containerBounds = this.refs.dom.getBoundingClientRect();
    const elementBounds = this.props.children instanceof HTMLImageElement ? { width: this.props.children.naturalWidth, height: this.props.children.naturalHeight } : this.props.children instanceof HTMLVideoElement ? { width: this.props.children.videoWidth, height: this.props.children.videoHeight } : { width: 0, height: 0 };

    this.props.children.classList.add('absolute');

    if (this.props.size === PreloadAsset.SIZE.CONTAIN) {
      size = BackgroundTools.contain(elementBounds.width, elementBounds.height, containerBounds.width, containerBounds.height);
    } else {
      size = BackgroundTools.cover(elementBounds.width, elementBounds.height, containerBounds.width, containerBounds.height);
    }

    TweenLite.set(this.props.children, {
      width: size.width,
      height: size.height,
      left: size.x,
      top: size.y
    });
  }

  update () {
    this.resize();
  }

  componentDidUpdate () {
    this.refs.dom.innerHTML = '';
    this.refs.dom.appendChild(this.props.children);
  }

  render () {
    return <span className={['preload-asset', this.props.className ? this.props.className : ''].join(' ')} ref="dom"/>
  }
}

PreloadAsset.SIZE = {
  COVER: 0,
  CONTAIN: 1
}

export default PreloadAsset;
