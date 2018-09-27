const Model = require('./Model')
const LIFECYCLE_METHODS = require('../utilities/lifecycleMethods')

const INDEPENDENT_LIFECYCLE_METHODS = LIFECYCLE_METHODS.filter(({ dependsOn, }) => dependsOn.length < 1)
const DEPENDENT_LIFECYCLE_METHODS = LIFECYCLE_METHODS.filter(({ dependsOn, }) => dependsOn.length > 0)

const INDEPENDENT_LIFECYCLE_METHOD_NAMES = INDEPENDENT_LIFECYCLE_METHODS.map(({ name, }) => name)
const DEPENDENT_LIFECYCLE_METHOD_PROMPTS = (modelName) => DEPENDENT_LIFECYCLE_METHODS.map(({ name, dependsOn, }) => ({
    name,
    type: 'confirm',
    when({ stateful, methods, }) {
        return stateful && dependsOn.reduce((dependsOn, dependencyMethodName) => (
           dependsOn && methods.includes(dependencyMethodName)
        ), true)
    },
    message: `Does this ${modelName} have ${name}?`,
    default: false,
}))

function ReactComponent({ name, }) {
    return [
        ...new Model({ name, }),
        {
            name: 'scope',
            type: 'checkbox',
            message: `Select the scope of this ${name}:`,
            choices: [
                'client',
                'server',
            ],
            default: [
                'client',
                'server',
            ],
        },
        {
            name: 'stateful',
            type: 'confirm',
            message: `Does this ${name} have state?`,
            default: false,
        },
        {
            name: 'methods',
            type: 'checkbox',
            when({ stateful, }) {
                return stateful
            },
            message: `Select which methods this ${name} will override:`,
            choices: INDEPENDENT_LIFECYCLE_METHOD_NAMES,
        },
        ...DEPENDENT_LIFECYCLE_METHOD_PROMPTS(name)
    ]
}

module.exports = ReactComponent
