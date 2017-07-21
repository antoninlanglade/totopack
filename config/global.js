const path = require('path');
const PATHS = require(path.join(__dirname, '/paths'));

module.exports = {
  HTML_WEBPACK_PLUGIN_CONFIG: {
    template: PATHS.app + '/index.hbs',
    appMountId: 'app',
    inject: false,
    title: 'totopack',
    publicPath: '/',
    favicon: path.join(PATHS.assets, 'images/favicon.png'),
    window: {
      locales: [],
      path: '/'
    }
  }
}
