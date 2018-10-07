const HELPERS = [
	require('./plop/helpers/componentHeader'),
	require('./plop/helpers/componentDefaultCode'),
	require('./plop/helpers/componentIsClass'),
	require('./plop/helpers/componentMethodHeader'),
	require('./plop/helpers/componentSortMethods'),
]

const ACTION_TYPES = [
	require('./plop/actions/types/Augment'),
]

const GENERATORS = [
	require('./plop/generators/CreateNewComponent'),
]

const PROMPTS = {
	'autocomplete': require('inquirer-autocomplete-prompt')
}

function plopfile(plop) {
	Object.keys(PROMPTS).forEach((name) => {
		plop.setPrompt(name, PROMPTS[name])
	})

	HELPERS.forEach((Helper) => {
		const { name, helper, } = new Helper()

		plop.setHelper(name, helper)
	})

	ACTION_TYPES.forEach((ActionType) => {
		const { name, action, } = new ActionType()

		plop.setActionType(name, action)
	})

	GENERATORS.forEach((Generator) => {
		const { name, ...generator } = new Generator()

		plop.setGenerator(name, generator)
	})
}

module.exports = plopfile
