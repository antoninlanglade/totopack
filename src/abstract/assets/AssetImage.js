import Asset from './Asset';

export default class AssetImage extends Asset {
  constructor (props) {
    super(props);

    this.asset = document.createElement('img');
    this.asset.src = this.url;
    this.asset.addEventListener('load', this.onLoad);
    this.asset.addEventListener('error', this.onError);
  }

  onLoad () {
    this.asset.addEventListener('load', this.onLoad);
    super.onLoad();
  }

  onError () {
    this.asset.removeEventListener('error', this.onError);
    super.onError();
  }
}
