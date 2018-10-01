const Model = require('./Model')
const DependentReactComponentLifecycleMethod = require('./DependentReactComponentLifecycleMethod')
const getSafeConfig = require('../utilities/getSafeConfig')
const LIFECYCLE_METHODS = require('../utilities/reactLifecycleMethods')

function getRoutes(config, namePrefix) {
	return [
		...(
			config.routes
				.map((route) => {
					const mappedRoute = route
					const routeName = `${namePrefix}/${route.name}`
					mappedRoute.name = routeName
					return [
						mappedRoute,
						...(
							route.components.map((component) => {
								const mappedComponent = component
								mappedComponent.name = `${routeName}/${component.name}`
								return mappedComponent
							})
						),
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

function getAllRoutes(answers, config) {
	return getRoutes(config, `${answers.scope}/routes`)
}

function getComponentsWithSameScope(answers, config) {
	const { scope: thisComponentScope, } = answers
	return config.components
		.filter((component) => {
			const { scope: thatComponentScope, } = component
			return (thisComponentScope === thatComponentScope)
		})
		.map((component) => {
			const mappedComponent = component

			mappedComponent.name = `${component.scope}/components/${component.name}`
			return mappedComponent
		})
}

function getFilteredLocations(answers, config) {
	const { scope: thisComponentScope, } = answers
	const componentsWithSameScope = getComponentsWithSameScope(answers, config)

	if (thisComponentScope === 'common') {
		return [
			...componentsWithSameScope,
			...getAllRoutes(answers, config),
		]
	}

	return componentsWithSameScope
}

function filterLocations(answers, input) {
	return new Promise((resolve) => {
		getSafeConfig().then((config) => {
			const locations = getFilteredLocations(answers, config)
			const locationNames = locations
				.map((location) => location.name)
				.sort()

			resolve([
				`${answers.scope}/components`,
				...locationNames.filter((location) => location.toLowerCase().includes(input.toLowerCase()))
			])
		})
	})
}

function ReactComponent({ name, }) {
	return [
		...new Model({ name, }),
		{
			name: 'scope',
			type: 'checkbox',
			message: `Select the scope of this ${name}:`,
			choices: [
				'client',
				'server',
			],
			default: [
				'client',
				'server',
			],
			filter(input) {
				if (input.includes('client') && input.includes('server')) {
					return 'common'
				}
				let [defaultOutput = 'client', ] = input
				return defaultOutput
			}
		},
		{
			name: 'stateful',
			type: 'confirm',
			message: `Does this ${name} have state?`,
			default: false,
		},
		{
			name: 'methods',
			type: 'checkbox',
			message: `Select which methods this ${name} will override:`,
			choices: (
				LIFECYCLE_METHODS
					.filter((method) => method.dependsOn.length < 1)
					.map((method) => method.name)
			),
		},
		...(
			LIFECYCLE_METHODS
				.filter((method) => method.dependsOn.length > 0)
				.map((method) => (
					new DependentReactComponentLifecycleMethod(
						Object.assign({}, method, { modelName: name, })
					)
				))
				.reduce((prompts, methodPrompts) => [...prompts, ...methodPrompts], [])
		),
		{
			name: 'location',
			type: 'autocomplete', // TODO write inquirer prompt for route based on autocomplete
			message: `Where should this ${name} reside?`,
			//default: 'components',
			source(answers, input) {
				return filterLocations(answers, input || '')
			},
			validate(input) {
				if (!input.trim()) {
					return 'Enter a valid location.'
				}
				const [firstFragment, ] = input.split('/')
				if (!('components routes'.split(' ').includes(firstFragment))) {
					return 'Location is ambiguous -- is it a component or a route?'
				}
				return true
			},
		}
	]
}

module.exports = ReactComponent
