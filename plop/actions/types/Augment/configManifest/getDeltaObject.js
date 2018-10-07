const getComponentDeltaObject = require('./getComponentDeltaObject')

function getDeltaObject(config, delta) {
	const { type, payload, } = delta

	switch (type) {
		case 'component':
			return getComponentDeltaObject(config, delta)
		case 'module':
			return {
				modules: [
					...config.modules,
					payload[type],
				],
			}
		default:
			break
	}

	return {}
}

module.exports = getDeltaObject
