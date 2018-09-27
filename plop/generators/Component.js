const ReactComponent = require('../prompts/ReactComponent')
const AddComponent = require('../actions/AddComponent')

function Component() {
    const name = 'Component'
    return {
        name,
        description: 'React Component',
        prompts: new ReactComponent({ name, }),
        actions: new AddComponent()
    }
}

module.exports = Component
