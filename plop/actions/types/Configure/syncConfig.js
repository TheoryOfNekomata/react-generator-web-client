const fs = require('fs-extra')
const prettier = require('prettier')

const getConfigFilePath = require('../../../utilities/getConfigFilePath')
const getSafeConfig = require('../../../utilities/getSafeConfig')
const isSubComponent = require('../../../utilities/isSubComponent')
const isScopeComponent = require('../../../utilities/isScopeComponent')

function writeConfig(config) {
	const configPath = getConfigFilePath()
	const configOutput = prettier.format(config, { filepath: configPath, })

	return fs.writeFile(configPath, configOutput)
}

function serializeConfig(config) {
	return JSON.stringify(config, null, 2)
}

function isValidDelta(delta) {
	return (
		delta !== null &&
		typeof delta === 'object'
	)
}

function mergeComponentConfig(config, delta) {
	const { type, payload, } = delta
	const { location, ...newComponent } = payload[type]
	let deltaObject
	if (isSubComponent(location)) {
		const locationFragments = location.split('/').slice(1)
		// TODO construct deltaObject from location
	}
	deltaObject = {
		components: [
			...config.components,
			Object.assign({}, newComponent, { subComponents: [], }),
		],
	}
	return deltaObject
}

function mergeConfig(config, delta) {
	if (!isValidDelta(delta)) {
		return config
	}
	const { type, payload, } = delta
	let deltaObject

	switch (type) {
		case 'component':
			deltaObject = mergeComponentConfig(config, delta)
			break
		case 'module':
			deltaObject = {
				modules: [
					...config.modules,
					payload[type],
				],
			}
			break
		default:
			break
	}

	return Object.assign({}, config, deltaObject)
}

function syncConfig(delta) {
	return new Promise((resolve, reject) => {
		getSafeConfig().then((config) => {
			const mergedConfig = mergeConfig(config, delta)
			const formattedConfig = serializeConfig(mergedConfig)
			writeConfig(formattedConfig)
				.then(
					() => { resolve(mergedConfig) },
					(err) => { reject(err) }
				)
		})
	})
}

module.exports = syncConfig
