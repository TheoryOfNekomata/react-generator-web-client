const configManifest = require('./configManifest')
const configFileSystem = require('./configFileSystem')

function getActionSubtext(type, answers) {
	switch (type) {
		case 'component':
			return `${type}/${answers.name}` // todo better subtext
		default:
			break
	}
	return ''
}

function Augment() {
	return {
		name: 'augment',
		action(answers, actionConfig, plop) {
			const { action: actionType, } = actionConfig
			const { focus, } = actionType
			const delta = {
				type: focus,
				payload: {
					[focus]: answers,
				},
			}

			return new Promise((resolve, reject) => {
				configManifest(delta).then(
					(manifest) => {
						configFileSystem(answers, actionConfig, plop, manifest).then(
							() => {
								let subtext = getActionSubtext(focus, answers)
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

module.exports = Augment
