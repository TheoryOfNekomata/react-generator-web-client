function getFullRouteName(routeName, parentRouteName = '') {
	return `${parentRouteName}/routes/${routeName}`
}

function getAllRoutes(config) {
	function getRoutes(config, parentRouteName) {
		return (
			config.routes
				.map((route) => {
					const mappedRoute = route
					const routeName = getFullRouteName(route.name, parentRouteName)
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
	return getRoutes(config)
}

module.exports = getAllRoutes
