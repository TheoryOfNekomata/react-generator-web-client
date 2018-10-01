function Model({ name, }) {
	return [
		{
			name: 'name',
			type: 'input',
			message: `Type your ${name} name:`,
			validate(input) {
				if (!input.trim()) {
					return 'Enter a valid name.'
				}
				return true
			}
		},
	]
}

module.exports = Model
