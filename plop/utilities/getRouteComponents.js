function getRouteComponents(routes) {
	return (
		routes
			.map((route) => (
				route.components.map((component) => {
					const mappedComponent = component
					mappedComponent.name = `${route.name}/components/${component.name}`
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
