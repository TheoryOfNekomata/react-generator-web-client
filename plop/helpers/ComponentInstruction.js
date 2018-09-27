const LIFECYCLE_METHODS = require('../utilities/lifecycleMethods')

function ComponentInstruction() {
    return {
        name: 'componentInstruction',
        helper(methodName) {
            let [lifecycleMethod = null, ] = LIFECYCLE_METHODS.filter((method) => method.name === methodName)

            if (lifecycleMethod === null) {
                throw new Error(`Unknown lifecycle method: ${methodName}`)
            }

            return lifecycleMethod.instruction
        }
    }
}

module.exports = ComponentInstruction
