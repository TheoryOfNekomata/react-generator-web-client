function getFullRouteName(route, parentRouteName) {
	return `${parentRouteName}/routes/${route.name}`
}

function getAllRoutes(config, scope) {
	function getRoutes(config, parentRouteName) {
		return (
			config.routes
				.map((route) => {
					const mappedRoute = route
					const routeName = getFullRouteName(route, parentRouteName)
					mappedRoute.name = routeName
					return [
						mappedRoute,
						...getRoutes(route, routeName),
					]
				})
				.reduce(
					(allRoutes, route) => [
						...allRoutes,
						...route,
					],
					[]
				)
		)
	}

	// there are no client-specific or server-specific routes, scope will always be common
	return getRoutes(config, scope)
}

module.exports = getAllRoutes
