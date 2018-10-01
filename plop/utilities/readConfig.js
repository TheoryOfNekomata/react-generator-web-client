const fs = require('fs-extra')
const getConfigFilePath = require('./getConfigFilePath')

function deserializeConfig(serializedConfig) {
	return JSON.parse(serializedConfig)
}

function readConfig() {
	const configPath = getConfigFilePath()

	return new Promise((resolve, reject) => {
		fs.readFile(configPath)
			.then(
				(data) => {
					try {
						let deserializedConfig = deserializeConfig(data.toString())
						resolve(deserializedConfig)
					} catch (e) {
						reject(e)
					}
				},
				(err) => { reject(err) }
			)
	})
}

module.exports = readConfig
