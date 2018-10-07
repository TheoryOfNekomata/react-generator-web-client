const getAllRoutes = require('./getAllRoutes')
const getComponentsWithSameScope = require('./getComponentsWithSameScope')
const getRouteComponents = require('./getRouteComponents')

function getComponentParentsInScope(config, scope) {
	const componentsWithSameScope = getComponentsWithSameScope(
		scope,
		config.components
	)
		.map((component) => {
			const mappedComponent = component

			mappedComponent.name = `/components/${component.name}`
			return mappedComponent
		})

	if (scope === 'common') {
		const allRoutes = getAllRoutes(config)
		return [
			...componentsWithSameScope,
			...allRoutes,
			...getRouteComponents(allRoutes),
		]
	}
	return componentsWithSameScope
}

module.exports = getComponentParentsInScope
