const isSubComponentLocation = require('../../../../utilities/isSubComponentLocation')

function getComponentDeltaObject(config, delta) {
	const { type, payload, } = delta
	const { location, ...newComponent } = payload[type]

	if (!isSubComponentLocation(location)) {
		newComponent.components = []
	}

	const locationFragments = location
		.split('/')
		.filter((fragment) => fragment.trim().length > 0)
	let configCursor = config
	const deltaObject = {}
	let deltaObjectCursor = deltaObject

	locationFragments.forEach((fragment) => {
		if (configCursor === null) {
			return
		}

		if (!(configCursor instanceof Array)) {
			configCursor = configCursor[fragment]
			deltaObjectCursor[fragment] = {}
			deltaObjectCursor = deltaObjectCursor[fragment]
			return
		}

		let [configCursorItem = null, ] = configCursor.filter(
			(item) => item.name === fragment
		)

		if (configCursorItem === null) {
			configCursor = null
			return
		}

		configCursor = configCursorItem
		deltaObjectCursor[fragment] = configCursorItem
		deltaObjectCursor = deltaObjectCursor[fragment]
	})

	if (configCursor === null) {
		return {}
	}

	deltaObjectCursor.components = [
		...configCursor.components,
		newComponent,
	]

	return deltaObject
}

module.exports = getComponentDeltaObject
