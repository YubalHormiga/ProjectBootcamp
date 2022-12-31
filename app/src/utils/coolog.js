console.log('%cCOOL lög %cv0.2', 'font-size: 24px;', 'font-size: 12px;')

function log(level, message) {
    let style

    if (level === 'DEBUG')
        style = 'color: green'
    else if (level === 'INFO')
        style = 'color: dodgerblue'
    else if (level === 'WARN')
        style = 'color: orange'
    else if (level === 'ERROR')
        style = 'color: tomato'
    else if (level === 'FATAL')
        style = 'color: white; background-color: tomato'

    console.log('%c' + level + ': ' + message, style)
}

log.on = false
log.level = 'DEBUG'

log.debug = function (message) {
    this.on && this.level === 'DEBUG' && this('DEBUG', message)
}

log.info = function (message) {
    this.on && (this.level === 'DEBUG' || this.level === 'INFO') && this('INFO', message)
}

log.warn = function (message) {
    this.on && (this.level === 'DEBUG' || this.level === 'INFO' || this.level === 'WARN') && this('WARN', message)
}

log.error = function (message) {
    this.on && (this.level === 'DEBUG' || this.level === 'INFO' || this.level === 'WARN' || this.level === 'ERROR') && this('ERROR', message)
}

log.fatal = function (message) {
    this.on && (this.level === 'DEBUG' || this.level === 'INFO' || this.level === 'WARN' || this.level === 'ERROR' || this.level === 'FATAL') && this('FATAL', message)
}

export default log
// module.exports = log