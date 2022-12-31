module.exports = class UnexpectedError extends Error {
    constructor(message) {
        super(message)

        this.name = UnexpectedError.name
    }
}