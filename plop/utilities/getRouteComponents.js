function getFullComponentName(component, route) {
	return `${route.name}/components/${component.name}`
}

function getRouteComponents(routes) {
	return (
		routes
			.map((route) => (
				route.components.map((component) => {
					const mappedComponent = component
					mappedComponent.name = getFullComponentName(component, route)
					return mappedComponent
				})
			))
			.reduce(
				(allRouteComponents, routeComponents) => [
					...allRouteComponents,
					...routeComponents,
				],
				[]
			)
	)
}

module.exports = getRouteComponents
