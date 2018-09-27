function Model({ name, }) {
    return [
        {
            name: 'name',
            type: 'input',
            message: `Type your ${name} name:`,
        },
    ]
}

module.exports = Model
