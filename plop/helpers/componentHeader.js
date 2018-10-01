function componentHeader() {
	return {
		name: 'componentHeader',
		helper(name, methods, stateful) {
			if (stateful || methods.length > 0) {
				return `class ${name} extends React.Component`
			}
			return `function ${name}(props)`
		}
	}
}

module.exports = componentHeader
