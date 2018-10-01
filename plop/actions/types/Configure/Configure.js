const syncConfig = require('./syncConfig')
const syncFiles = require('./syncFiles')

function getActionSubtext(type, answers) {
	switch (type) {
		case 'component':
			return `${type}/${answers.name}` // todo better subtext
		default:
			break
	}
	return ''
}

function Configure() {
	return {
		name: 'configure',
		action(answers, config, plop) {
			const { action: configureAction, } = config
			const { type, } = configureAction
			const delta = {
				type,
				payload: {
					[type]: answers,
				},
			}

			return new Promise((resolve, reject) => {
				syncConfig(delta)
					.then(
						(mergedConfig) => {
							syncFiles(answers, config, plop, mergedConfig)
								.then(
									() => {
										let subtext = getActionSubtext(type, answers)
										resolve(subtext)
									},
									(err) => { reject(err) }
								)
						},
						(err) => { reject(err) }
					)
			})
		}
	}
}

module.exports = Configure
