const Model = require('./Model')
const DependentReactComponentLifecycleMethod = require('./DependentReactComponentLifecycleMethod')
const getSafeConfig = require('../utilities/getSafeConfig')
const getValidComponentParents = require('../utilities/getValidComponentParents')
const LIFECYCLE_METHODS = require('../utilities/reactLifecycleMethods')

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
			source(answers, input) {
				return new Promise((resolve) => {
					getSafeConfig()
						.then((config) => {
							resolve(getValidComponentParents(answers, input, config))
						})
				})
			},
		}
	]
}

module.exports = ReactComponent
