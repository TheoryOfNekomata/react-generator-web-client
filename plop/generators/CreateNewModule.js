const ModulePrompt = require('../prompts/Module')
const AddModule = require('../actions/AddModule')

function CreateNewModule() {
	const name = 'module'
	return {
		name,
		description: 'Redux Module',
		prompts: new ModulePrompt({ name, }),
		actions: new AddModule()
	}
}

module.exports = CreateNewModule
