// Paths node
const path = require('path');
 	_ = require('lodash'),
 	fs = require('fs-extra'),
	sharp = require('sharp');

const PATHS = require(path.join(__dirname + '/../config/paths'));

let assets = [
	PATHS.assets+'/images/test/panda.jpg'
];



function deleteTinyFolder() {
	return new Promise((resolve, reject) => {
		fs.remove(path.join(PATHS.assets,'images-tiny'), err => err ? reject() : resolve());
	});
}

function reduceAsset() {
	return new Promise((resolve, reject) => {
		_.forEach(assets, (asset) => {

			const image = sharp(asset);
			const outputFilepath = path.join(PATHS.assets, 'images-tiny', path.relative(PATHS.assets + '/images/', asset));
			fs.ensureDir(path.dirname(outputFilepath), (err) => {
				image.metadata()
					.then(function (metadata) {
						console.log(metadata);
						return image
							.resize(Math.round(metadata.width / 2))
							.webp()
							.toBuffer()
					})
					.then(function (data) {
						console.log(data);
						image.toFile(outputFilepath);
					});
			});
			
		});
		/*resolve();*/
	});
}

deleteTinyFolder()
	.then(reduceAsset);
