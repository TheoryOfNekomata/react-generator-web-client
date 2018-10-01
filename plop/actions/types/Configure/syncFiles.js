const path = require('path')
const fs = require('fs-extra')
const prettier = require('prettier')

const isSubComponent = require('../../../utilities/isSubComponent')
const isScopeComponent = require('../../../utilities/isScopeComponent')

function computeComponentDir(answers) {
	const srcRoot = path.join(process.cwd(), 'src')
	const { location, name, } = answers
	const isSubcomponent = isSubComponent(location)
	const scopeComponent = isScopeComponent(location)
	const baseLocation = path.join(srcRoot, location)

	if (isSubcomponent) {
		return baseLocation
	}
	if (scopeComponent) {
		return path.join(baseLocation, name)
	}
	const locationFragments = location.split('/')
	// is route component, add components
	return path.join(
		srcRoot,
		...locationFragments.slice(0, 3),
		...(
			locationFragments
				.slice(3)
				.map((fragment) => ['routes', fragment])
				.reduce(
					(fragments, fragment) => [...fragments, ...fragment],
					[]
				)
		),
		'components',
		name
	)
}

function getSubComponents(answers, appConfig) {

	return []
}

function addComponentFile(answers, actionConfig, plop, appConfig) {
	const outputDir = computeComponentDir(answers, appConfig)
	const plopBasePath = path.resolve(__dirname, '../../..')

	const filesToWrite = [
		{
			templatePath: 'templates/ReactComponent/component.jsx.hbs',
			path: '{{basePath}}/{{name}}.jsx',
		},
		{
			templatePath: 'templates/ReactComponent/index.js.hbs',
			path: '{{basePath}}/index.js'
		}
	]

	const promises = filesToWrite
		.map((file) => new Promise((resolve, reject) => {
			const templatePath = path.resolve(plopBasePath, file.templatePath)
			fs.readFile(templatePath)
				.then(
					(data) => {
						const template = data.toString()
						const injectedParams = {
							basePath: outputDir,
							subComponents: getSubComponents(answers, appConfig)
						}
						const templateParams = Object.assign({}, answers, injectedParams)
						const output = plop.renderString(file.path, templateParams)
						const templateOutput = prettier.format(
							plop.renderString(template, templateParams),
							{ filepath: output, }
						)
						fs
							.outputFile(output, templateOutput)
							.then(
								() => { resolve() },
								(err2) => { reject(err2) }
							)
					},
					() => { resolve() }
				)
		}))

	return Promise.all(promises)
}

function syncComponentFiles(answers, appNode, plop, mergedConfig) {
	return addComponentFile(answers, appNode, plop, mergedConfig)
	// todo sync other components which are not existing
	//appNode.components.forEach((component) => {
	//	const computedComponentDestRoot = path.join(process.cwd(), 'src', componentDestRoot, 'components')
	//	const computedComponentDestDir = path.join(computedComponentDestRoot, component.name)
	//	fs.stat(computedComponentDestDir, (err) => {
	//		if (!err) { // TODO check if dir is not existing
	//			return
	//		}
	//
	//		let componentTemplateDir = path.resolve(__dirname, '../../../templates/ReactComponent')
	//	})
	//})
}

function addModuleFile(answers, actionConfig, plop, appNode) {
	appNode.modules.forEach((moduleItem) => {

	})
}

function addRouteFile(answers, actionConfig, plop, appNode) {
	appNode.routes.forEach((route) => {
		syncComponentFiles(answers, route)
		addRouteFile(answers, route)
	})
}

function syncFiles(answers, actionConfig, plop, appConfig) {
	const { action, } = actionConfig
	const { type, } = action
	switch (type) {
		case 'component':
			return addComponentFile(answers, actionConfig, plop, appConfig, '/')
		case 'module':
			return addModuleFile(answers, actionConfig, plop, appConfig)
		case 'route':
			return addRouteFile(answers, actionConfig, plop, appConfig)
		default:
			break
	}
	return new Promise((resolve) => { resolve() })
}

module.exports = syncFiles
