const LIFECYCLE_METHODS = require('../utilities/reactLifecycleMethods')

const LIFECYCLE_METHOD_NAMES = LIFECYCLE_METHODS.map(({ name, }) => name)

function componentSortMethods() {
	return {
		name: 'componentSortMethods',
		helper(methodNames, getDerivedStateFromProps, getSnapshotBeforeUpdate) {
			let availableMethods = [
				...methodNames,
			]

			if (getDerivedStateFromProps) {
				availableMethods.push('getDerivedStateFromProps')
			}

			if (getSnapshotBeforeUpdate) {
				availableMethods.push('getSnapshotBeforeUpdate')
			}

			return LIFECYCLE_METHOD_NAMES.filter((methodName) => (
				availableMethods.includes(methodName)
			))
		}
	}
}

module.exports = componentSortMethods
