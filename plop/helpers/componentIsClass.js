function componentIsClass() {
	return {
		name: 'componentIsClass',
		helper(methods, stateful) {
			return stateful || methods.length > 0
		}
	}
}

module.exports = componentIsClass
