/* global Image */
import Asset from './Asset';

export default class AssetImage extends Asset {
  constructor (props) {
    super(props);

    this.asset = new Image();
    this.asset.src = this.url;
    this.asset.addEventListener('load', this.onLoad);
  }

  onLoad () {
    this.asset.removeEventListener('load', this.onLoad);
    super.onLoad();
  }
}
