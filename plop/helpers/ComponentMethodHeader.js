const LIFECYCLE_METHODS = require('../utilities/lifecycleMethods')

function ComponentHeader() {
    return {
        name: 'componentMethodHeader',
        helper(methodName) {
            let [lifecycleMethod = null, ] = LIFECYCLE_METHODS.filter((method) => method.name === methodName)

            if (lifecycleMethod === null) {
                throw new Error(`Unknown lifecycle method: ${methodName}`)
            }

            let { name, params, 'static': isStatic, } = lifecycleMethod

            let baseName = `${name}(${params.join(', ')})`

            if (isStatic) {
                return `static ${baseName}`
            }

            return baseName
        }
    }
}

module.exports = ComponentHeader
