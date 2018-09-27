function loadState() {
    return {}
}

function Sync() {
    return {
        name: 'sync',
        action(answers, { delta, }) {
            let state = loadState()
            let config = delta(state, answers)
        }
    }
}

module.exports = Sync
