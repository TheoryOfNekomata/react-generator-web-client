function ComponentScopeDirectory() {
    return {
        name: 'componentScopeDirectory',
        helper(scope) {
            if (scope.includes('client') && scope.includes('server')) {
                return 'common'
            }
            let [scopeDirectory = 'client',] = scope
            return scopeDirectory
        }
    }
}

module.exports = ComponentScopeDirectory
