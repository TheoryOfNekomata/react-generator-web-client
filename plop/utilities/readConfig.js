const fs = require('fs-extra')
const getConfigFilePath = require('./getConfigFilePath')
const deserializeConfig = require('./deserializeConfig')

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
