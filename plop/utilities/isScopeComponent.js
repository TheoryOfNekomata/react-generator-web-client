function isScopeComponent(location) {
	const [lastFragment, ] = location
		.split('/')
		.reduce(
			(reversedFragments, fragment) => [fragment, ...reversedFragments],
			[]
		)

	return lastFragment === 'components'
}

module.exports = isScopeComponent
