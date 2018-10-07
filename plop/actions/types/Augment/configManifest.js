const {
	getFilePath,
	IOManager,
	DataSerializer,
} = require('../../../utilities/manifest')

const getDeltaObject = require('./configManifest/getDeltaObject')

const ioManager = new IOManager({
	serializer: new DataSerializer({ filePath: getFilePath(), }),
})

function configManifest(delta) {
	return new Promise((resolve, reject) => {
		ioManager.read().then((manifest) => {
			const mergedConfig = Object.assign({}, manifest, getDeltaObject(manifest, delta))
			ioManager.write(mergedConfig).then(
				() => { resolve(mergedConfig) },
				(err) => { reject(err) }
			)
		})
	})
}

module.exports = configManifest
