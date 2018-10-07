const path = require('path')
const fs = require('fs-extra')
const prettier = require('prettier')

const CONFIG_FILENAME = '.plop.json'

function getFilePath() {
	return path.resolve(process.cwd(), CONFIG_FILENAME)
}

class DataSerializer {
	constructor(params) {
		this.filePath = params.filePath
	}

	serialize(deserializedData) {
		return prettier.format(deserializedData, { filepath: this.filePath, })
	}

	deserialize(serializedData) {
		return JSON.parse(serializedData)
	}
}

function readData(serializer) {
	return new Promise((resolve, reject) => {
		fs.readFile(serializer.filePath)
			.then(
				(data) => {
					try {
						let deserializedData = serializer.deserialize(data.toString())
						resolve(deserializedData)
					} catch (e) {
						reject(e)
					}
				},
				(err) => { reject(err) }
			)
	})
}

function writeData(mergedConfig, serializer) {
	const dataOutput = serializer.serialize(mergedConfig)

	return fs.writeFile(serializer.filePath, dataOutput)
}

class IOManager {
	constructor(params) {
		this.serializer = params.serializer
	}

	read() {
		return new Promise((resolve) => {
			readData(this.serializer)
				.then(
					(config) => {
						resolve(config)
					},
					() => {
						resolve({
							components: [],
							modules: [],
							routes: [],
						})
					}
				)
		})
	}

	write(mergedConfig) {
		const self = this
		return new Promise((resolve, reject) => {
			writeData(mergedConfig, self.serializer)
				.then(
					() => { resolve() },
					(err) => { reject(err) }
				)
		})
	}

	merge(delta) {
		const self = this
		return new Promise((resolve, reject) => {
			self.read().then((config) => {
				const mergedConfig = Object.assign({}, config, delta)
				writeData(mergedConfig, self.serializer)
					.then(
						() => { resolve(mergedConfig) },
						(err) => { reject(err) }
					)
			})
		})
	}
}

module.exports = {
	DataSerializer,
	IOManager,
	getFilePath,
}
