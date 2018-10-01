const ReactComponent = require('../prompts/ReactComponent')
const AddComponent = require('../actions/AddComponent')

function CreateNewComponent() {
	return {
		name: 'Create new component',
		description: 'Create a new React Component',
		prompts: new ReactComponent({ name: 'component', }),
		actions: new AddComponent()
	}
}

module.exports = CreateNewComponent
