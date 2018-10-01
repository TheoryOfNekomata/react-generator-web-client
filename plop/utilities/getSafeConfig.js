const readConfig = require('./readConfig')

function getSafeConfig() {
	return new Promise((resolve) => {
		readConfig()
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

module.exports = getSafeConfig
