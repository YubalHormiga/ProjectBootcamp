module.exports = class ConflictError extends Error {
    constructor(message) {
        super(message)

        this.name = ConflictError.name
    }
}