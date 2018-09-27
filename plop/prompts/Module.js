const Model = require('./Model')

function Module({ name, }) {
    return [
        ...new Model({ name, }),
    ]
}

module.exports = Module
