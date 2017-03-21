// Paths node
const path = require('path');
 	_ = require('lodash'),
 	fs = require('fs-extra'),
	sharp = require('sharp');

const PATHS = require(path.join(__dirname + '/../config/paths'));

let assets = [
	PATHS.assets+'/lazy-images/test/panda.jpg',
	PATHS.assets+'/lazy-images/wallpaper.jpg'
];

deleteTinyFolder = () => {
	return new Promise((resolve, reject) => {
		fs.remove(path.join(PATHS.assets,'lazy-images-tiny'), (err) => {
			err ? reject(err) : resolve();
		});
	});
};

createDirectory = (outPath) => {
	return new Promise((resolve, reject) => {
		fs.ensureDir(path.dirname(outPath), (err) => {
			if (err) reject(err);
			else resolve();
		});
	});
};

divideSize = (size) => {
	let calculatedSize = size;
	while(calculatedSize > 50) {
		calculatedSize = Math.round(calculatedSize * 0.5);
	}
	return calculatedSize;
}

processAsset = (assetPath, outPath) => {
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

reduceAsset = () => {
	return new Promise((resolve, reject) => {
		let promises = [];
		_.forEach(assets, (asset) => {
			const outputFilepath = path.join(PATHS.assets, 'lazy-images-tiny', path.relative(PATHS.assets + '/lazy-images/', asset));
			
			promises.push(
				createDirectory(outputFilepath)
					.then(() => { processAsset(asset, outputFilepath) })
					.then(resolve)
					.catch(reject)
			)
			
		});
		Promise.all(promises)
			.then(resolve)
			.catch(reject);
	});
};


processTiny = () => {
	deleteTinyFolder()
		.then(reduceAsset)
		.then(() => {
			console.log('[ TinyImg ] Complete');
		})
		.catch((err) => {
			console.log('[ TinyImg ] Error ',err);
		});
}

module.exports = processTiny;
	