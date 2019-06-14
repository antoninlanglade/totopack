module.exports = {
  home: require('bundle-loader?lazy!pages/home/Home'),
  default: require('bundle-loader?lazy!pages/home/Home'),
  test: require('bundle-loader?lazy!pages/test/Test'),
}
