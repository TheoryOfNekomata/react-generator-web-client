function DependentReactComponentLifecycleMethod({ name, modelName, dependsOn, }) {
	return [
		{
			name,
			type: 'confirm',
			when(answers) {
				const { methods, } = answers
				return dependsOn.reduce((dependsOn, dependencyMethodName) => (
					dependsOn && methods.includes(dependencyMethodName)
				), true)
			},
			message: `Does this ${modelName} have ${name}?`,
			default: false,
		},
	]
}

module.exports = DependentReactComponentLifecycleMethod
