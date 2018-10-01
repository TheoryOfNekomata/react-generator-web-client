function Rebuild() {
	return [
		{
			name: 'which',
			type: 'checkbox',
			message: 'Select which files to rebuild:',
			choices: [
				'components',
				'modules',
				'routes',
			],
			default: [
				'components',
				'modules',
				'routes',
			],
		},
		{
			name: 'prettify',
			type: 'confirm',
			message: 'Prettify existing files?',
			default: false,
		},
	]
}

module.exports = Rebuild
