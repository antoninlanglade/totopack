/* global objectFitPolyfill */
import React from 'react';
import BLAZY from 'abstract/BLazy/BLazy';
import 'objectFitPolyfill';
// import Config from 'config/index';
// import EXIF from 'exif-js';
const style = require('./LazyImg.scss');

// const EXIF_ROTATIONS = [0, 0, 180, 0, 90, 90, -90, -90];

class LazyImg extends React.Component {
  constructor (props) {
    super();
    this.onLoaded = this.onLoaded.bind(this);
  }

  componentDidMount () {
    BLAZY.load(this.refs.img, this.onLoaded);
  }

  shouldComponentUpdate () {
    return false;
  }

  componentWillReceiveProps (nextProps) {
    const lastImg = this.refs.component.getElementsByTagName('img')[0];
    if (lastImg.dataset.save === nextProps.src) return;
    BLAZY.destroy(lastImg);
    this.refs.component.removeChild(lastImg);
    const newImage = document.createElement('img');
    newImage.classList.add('b-lazy');
    newImage.dataset.src = nextProps.src;
    newImage.dataset.save = nextProps.src;
    newImage.dataset.objectFit = nextProps.background;
    this.refs.component.appendChild(newImage);
    BLAZY.load(newImage, this.onLoaded);
  }

  componentWillUnmount () {
    BLAZY.destroy(this.refs.img);
  }

  // manageEXIFRotation (img) {
  //   EXIF.getData(img, function () {
  //     var orientation = EXIF.getTag(this, 'Orientation');
  //     if (orientation && !(Config.device && Config.safari)) {
  //       TweenLite.set(img, {
  //         rotation: EXIF_ROTATIONS[orientation - 1]
  //       });
  //     }
  //   });
  // }

  onLoaded (e) {
    this.props.background && this.refs.component.classList.add(this.props.background);
    objectFitPolyfill(e);
    // this.manageEXIFRotation(e);
    TweenLite.to(e, 1, {
      opacity: 1
    });
  }

  render () {
    return <div className={[style['b-lazy--img'], this.props.background || ''].join(' ')} ref="component" onClick={this.props.onClick}>
      <img ref="img" className="b-lazy" src="" data-object-fit={this.props.background} data-src={this.props.src} data-save={this.props.src}/>
    </div>;
  }
}

export default LazyImg;
