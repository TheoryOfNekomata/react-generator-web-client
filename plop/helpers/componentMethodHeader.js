const LIFECYCLE_METHODS = require('../utilities/reactLifecycleMethods')

function componentMethodHeader() {
	return {
		name: 'componentMethodHeader',
		helper(methodName) {
			const [lifecycleMethod = null,] = LIFECYCLE_METHODS.filter((method) => method.name === methodName)

			if (lifecycleMethod === null) {
				throw new Error(`Unknown lifecycle method: ${methodName}`)
			}

			const { name, params, 'static': isStatic, } = lifecycleMethod

			const baseName = `${name}(${params.join(', ')})`

			if (isStatic) {
				return `static ${baseName}`
			}

			return baseName
		}
	}
}

module.exports = componentMethodHeader
