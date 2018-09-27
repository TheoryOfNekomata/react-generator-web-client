function ComponentHeader() {
    return {
        name: 'componentHeader',
        helper(name, stateful) {
            if (stateful) {
                return `class ${name} extends React.Component`
            }
            return `function ${name}(props)`
        }
    }
}

module.exports = ComponentHeader
