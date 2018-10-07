const getComponentParentsInScope = require('./getComponentParentsInScope')
const sortComponents = require('./sortComponents')

const COMPONENT_PARENT_DISPLAY_KEY = 'name'
const COMPONENT_PARENT_DISPLAY_PREDICATE = (c) => c[COMPONENT_PARENT_DISPLAY_KEY]
const COMPONENT_PARENT_FILTER_PREDICATE = (filter) => (c) => c.name.toLowerCase().includes(filter.toLowerCase())

function getGlobalComponentParents() {
	return [
		{
			[COMPONENT_PARENT_DISPLAY_KEY]: '/',
		},
	]
}

function getValidComponentParents(answers, input, config) {
	let displayComponentParents = [
		...getGlobalComponentParents(),
		...sortComponents(
			getComponentParentsInScope(config, answers.scope),
			COMPONENT_PARENT_DISPLAY_PREDICATE
		),
	]

	if (input && typeof input === 'string') {
		displayComponentParents = displayComponentParents.filter(
			COMPONENT_PARENT_FILTER_PREDICATE(input)
		)
	}

	return displayComponentParents.map(COMPONENT_PARENT_DISPLAY_PREDICATE)
}

module.exports = getValidComponentParents
