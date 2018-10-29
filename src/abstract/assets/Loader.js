import uniqueId from 'lodash/uniqueId';
import defer from 'lodash/defer';

import AssetImage from './AssetImage';
import AssetVideo from './AssetVideo';
import AssetSound from './AssetSound';
import Extensions from './Extensions.json';
import Log from 'tools/log';

let assets = {};

let Loader = function (props) {
  let isLoading = false;
  let itemsLoaded = 0;
  let itemsToLoad = 0;
  let progressPercent = 0;

  function add (url, name = (uniqueId() + '_totopack_asset')) {
    // Check extension
    const extension = getExtension(url);
    const type = isExtensionExist(extension);

    // Don't have url
    if (!url) {
      Log('Loader', `Need a valid url`, 0);
      return false;
    }

    // Type unsupport
    if (!type) {
      Log('Loader', `Unvalid extension file .${extension}`, 0);
      return false;
    }

    // Already exist
    if (assets[name]) {
      Log('Loader', `Name ${name} already exist`);
      itemsToLoad++;
      defer(progress);
      return assets[name];
    }

    // First item to load from a list
    if (!isLoading) {
      isLoading = true;
    }

    itemsToLoad++;
    assets[name] = createAsset(url, name, type);
    return assets[name];
  }

  const remove = function (name) {
    assets[name] = null;
  }

  const get = function (name) {
    return assets[name];
  }

  const progress = function () {
    itemsLoaded++;
    progressPercent = itemsLoaded / itemsToLoad;
    props.onProgress && props.onProgress(progressPercent);
    // Log('Loader', `progress ${progressPercent}`);
    if (itemsLoaded === itemsToLoad) finish();
  }

  const finish = function (cb) {
    isLoading = false;
    itemsLoaded = 0;
    itemsToLoad = 0;
    progressPercent = 0;
    Log('Loader', 'finish', 1);
    props.onComplete && props.onComplete();
  }

  const getExtension = function (url) {
    const arr = url.split('.');
    return arr[arr.length - 1];
  }

  const isExtensionExist = function (extension) {
    let isValid = false;
    for (let type in Extensions) {
      if (Extensions[type].indexOf(extension) > -1) {
        isValid = type;
        break;
      }
    }
    return isValid;
  }

  const createAsset = function (url, name, type) {
    let asset;

    switch (type) {
      case 'img' :
        asset = new AssetImage({ url, name, cb: progress });
        break;

      case 'sound':
        asset = new AssetSound({ url, name, cb: progress });
        break;

      case 'video':
        asset = new AssetVideo({ url, name, cb: progress });
        break;

      default :
        break;
    }

    return asset.asset;
  }

  return {
    add,
    remove,
    get
  }
}

export default Loader;
