const LIFECYCLE_METHODS = require('../utilities/reactLifecycleMethods')

function componentDefaultCode() {
	return {
		name: 'componentDefaultCode',
		helper(methodName) {
			const [lifecycleMethod = null,] = LIFECYCLE_METHODS.filter((method) => method.name === methodName)

			if (lifecycleMethod === null) {
				throw new Error(`Unknown lifecycle method: ${methodName}`)
			}

			const { defaultCode, instruction, } = lifecycleMethod

			if (defaultCode === null || typeof defaultCode === 'undefined') {
				return `// TODO ${instruction}`
			}

			return `${defaultCode}\n// TODO ${instruction}`
		}
	}
}

module.exports = componentDefaultCode
