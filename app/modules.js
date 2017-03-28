module.exports = {
	home: require("bundle-loader?lazy!components/pages/home/Home"),
	tete: require("bundle-loader?lazy!components/pages/tete/Tete"),
	page404: require("bundle-loader?lazy!components/pages/page404/Page404"),
	product: require("bundle-loader?lazy!components/pages/product/Product")
}