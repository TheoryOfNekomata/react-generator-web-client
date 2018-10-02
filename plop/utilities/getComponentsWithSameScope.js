function getComponentsWithSameScope(scope, components) {
	return components
		.filter((component) => {
			const { scope: thatComponentScope, } = component
			return (scope === thatComponentScope)
		})
}

module.exports = getComponentsWithSameScope
