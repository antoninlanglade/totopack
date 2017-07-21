import React from 'react';
import { BLAZY, BLazySignal } from 'abstract/BLazy/BLazy';

require('./LazyImg.scss');

class LazyImg extends React.Component {
  constructor (props) {
    super();
    this.onLoaded = this.onLoaded.bind(this);
    this.img = props.src;
    this.tinyImg = props.src.replace('lazy-images/','lazy-images-tiny/');
  }

  componentDidMount () {
    BLAZY.load(this.refs.img, true);
    BLazySignal.add(this.onLoaded);
  }

  componentWillUnmount () {
    BLazySignal.remove(this.onLoaded);
  }

  onLoaded (e) {
    if (e.src.indexOf(this.img) > 1) {
      BLazySignal.remove(this.onLoaded);
      this.refs.component.classList.add('loaded');
    }
  }

  render () {
    return <div className="b-lazy--img" ref="component">
      <div className="loader"><span/><span/><span/><span/></div>
      <img ref="img" className="b-lazy" src={this.tinyImg} data-src={this.img} />
    </div>;
  }
}

export default LazyImg;
