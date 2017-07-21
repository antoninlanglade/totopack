/* global Audio */
import Asset from './Asset';

export default class AssetSound extends Asset {
  constructor (props) {
    super(props);

    this.asset = new Audio();
    this.asset.src = this.url;
    this.asset.addEventListener('canplay', this.onLoad);
  }

  onLoad () {
    this.asset.removeEventListener('canplay', this.onLoad);
    super.onLoad();
  }
}
