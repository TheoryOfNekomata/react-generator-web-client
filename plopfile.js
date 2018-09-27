const HELPERS = [
    require('./plop/helpers/ComponentHeader'),
    require('./plop/helpers/ComponentInstruction'),
    require('./plop/helpers/ComponentMethodHeader'),
    require('./plop/helpers/ComponentScopeDirectory'),
    require('./plop/helpers/ComponentSortMethods'),
]

const ACTION_TYPES = [
    require('./plop/actions/types/Sync'),
]

const GENERATORS = [
    require('./plop/generators/Component'),
]

function plopfile(plop) {
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
