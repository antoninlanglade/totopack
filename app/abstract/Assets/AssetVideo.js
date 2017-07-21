/* global Video */
import Asset from './Asset';

export default class AssetVideo extends Asset {
  constructor (props) {
    super(props);

    this.asset = new Video();
    this.asset.src = this.url;
    this.asset.addEventListener('canplay', this.onLoad);
  }

  onLoad () {
    this.asset.removeEventListener('canplay', this.onLoad);
    super.onLoad();
  }
}
