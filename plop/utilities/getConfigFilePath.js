const path = require('path')

const CONFIG_FILENAME = '.plop.json'

function getConfigFilePath() {
	return path.resolve(process.cwd(), CONFIG_FILENAME)
}

module.exports = getConfigFilePath
