function AddComponent() {
    return [
        //{
        //    type: 'sync',
        //    delta(state, newComponent) {
        //        return Object.assign(state, {
        //            components: [
        //                ...state.components,
        //                newComponent,
        //            ]
        //        })
        //    }
        //}
        {
            type: 'add',
            path: 'src/{{componentScopeDirectory scope}}/components/{{name}}/{{name}}.jsx',
            templateFile: 'plop/templates/ReactComponent/component.jsx.hbs',
        },
        {
            type: 'add',
            path: 'src/{{componentScopeDirectory scope}}/components/{{name}}/index.js',
            templateFile: 'plop/templates/ReactComponent/index.js.hbs',
        },
    ]
}

module.exports = AddComponent
