function AddModule() {
	return [
		{
			type: 'augment',
			action: {
				type: 'module'
			},
		},
	]
}

module.exports = AddModule
