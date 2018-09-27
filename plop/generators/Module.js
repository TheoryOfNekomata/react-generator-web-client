const ModulePrompt = require('../prompts/Module')
const AddModule = require('../actions/AddModule')

function Module() {
    const name = 'Module'
    return {
        name,
        description: 'React Component',
        prompts: new ModulePrompt({ name, }),
        actions: new AddModule()
    }
}

module.exports = Module
