function getRoutes(config, namePrefix) {
	return [
		...(
			config.routes
				.map((route) => {
					const mappedRoute = route
					const routeName = `${namePrefix}/routes/${route.name}`
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
		),
	]
}

function getAllRoutes(config, scope) {
	return getRoutes(config, scope) // there are no client-specific or server-specific routes, scope will always be common
}

module.exports = getAllRoutes
