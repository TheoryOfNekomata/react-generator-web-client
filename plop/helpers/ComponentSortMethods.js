const LIFECYCLE_METHODS = require('../utilities/lifecycleMethods')

const LIFECYCLE_METHOD_NAMES = LIFECYCLE_METHODS.map(({ name, }) => name)

function ComponentSortMethods() {
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

module.exports = ComponentSortMethods
