export default class Asset {
	constructor(props) {
		this.onLoad = this.onLoad.bind(this);
		this.name = props.name;
		this.url = props.url;
		this.cb = props.cb;
	}

	onLoad() {
		this.cb && this.cb(this.asset);
	}
}