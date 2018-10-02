const prettier = require('prettier')

function formatConfig(serializedConfig, configPath) {
	prettier.format(serializedConfig, { filepath: configPath, })
}

function serializeConfig(config, configPath) {
	return formatConfig(JSON.stringify(config, null, 2), configPath)
}

module.exports = serializeConfig
