// Paths node
const path = require('path');
const _ = require('lodash');
const fs = require('fs-extra');
const sharp = require('sharp');
const glob = require('glob');

const PATHS = require(path.join(__dirname, '/../config/paths'));

let assets = [];

const MAX_SIZE = 100;

const getAssetList = (dirPath) => {
  return new Promise((resolve, reject) => {
    glob(dirPath + '/**/*.+(jpg|jpeg|gif|png)', function (er, files) {
      if (er) reject(new Error(er));
      else {
        assets = files;
        resolve(assets);
      }
    });
  });
}

const deleteTinyFolder = () => {
  return new Promise((resolve, reject) => {
    fs.remove(path.join(PATHS.assets, 'lazy-images-tiny'), (err) => {
      err ? reject(err) : resolve();
    });
  });
};

const createDirectory = (outPath) => {
  return new Promise((resolve, reject) => {
    fs.ensureDir(path.dirname(outPath), (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

const divideSize = (size) => {
  let calculatedSize = size;
  while (calculatedSize > MAX_SIZE) {
    calculatedSize = Math.round(calculatedSize * 0.5);
  }
  return calculatedSize;
}

const processAsset = (assetPath, outPath) => {
  return new Promise((resolve, reject) => {
    const image = sharp(assetPath);
    image.metadata()
      .then((metadata) => {
        return image
          .resize(divideSize(metadata.width >= metadata.height ? metadata.width : metadata.height))
          .webp()
          .toBuffer()
      })
      .then((data) => {
        image.toFile(outPath)
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
};

const reduceAsset = () => {
  return new Promise((resolve, reject) => {
    let promises = [];
    _.forEach(assets, (asset) => {
      const outputFilepath = path.join(PATHS.assets, 'lazy-images-tiny', path.relative(PATHS.assets + '/lazy-images/', asset));
      promises.push(
        createDirectory(outputFilepath)
          .then(() => { processAsset(asset, outputFilepath) })
          .then(resolve)
          .catch(reject)
      );
    });
    Promise.all(promises)
      .then(resolve)
      .catch(reject);
  });
};

const processTiny = () => {
  return getAssetList(path.join(PATHS.assets, 'lazy-images'))
    .then(deleteTinyFolder)
    .then(reduceAsset)
    .then(() => {
      console.log('[ TinyImg ] Complete');
    })
    .catch((err) => {
      console.log('[ TinyImg ] Error ', err);
    });
}

module.exports = processTiny;
