function sortComponents(components, predicate) {
	const sortComponentGuide = components.map((c) => predicate(c)).sort()

	return sortComponentGuide.reduce(
		(sortedComponents, guideItem) => {
			const [component = null, ] = components.filter((c) => predicate(c) === guideItem)
			if (component === null) {
				return sortedComponents
			}

			return [
				...sortedComponents,
				component,
			]
		},
		[]
	)
}

module.exports = sortComponents
