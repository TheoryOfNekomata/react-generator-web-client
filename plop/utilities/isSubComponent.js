function isSubComponent(location) {
	const [, secondToLastFragment, ] = location
		.split('/')
		.reduce(
			(reversedFragments, fragment) => [fragment, ...reversedFragments],
			[]
		)

	return secondToLastFragment === 'components'
}

module.exports = isSubComponent
