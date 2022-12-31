const { errors: { LengthError, NotFoundError } } = require('com')
const { User, Flow } = require('../models')

function createFlow(userId, type, kind, description, amount, date) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')
    if (typeof type !== 'string') throw new TypeError('type is not a string')
    if (!type.length) throw new LengthError('type is empty')
    if (typeof kind !== 'string') throw new TypeError('kind is not a string')
    if (!kind.length) throw new LengthError('kind is empty')
    if (typeof description !== 'string') throw new TypeError('description is not a string')
    if (!description.length) throw new LengthError('description is empty')
    if (typeof amount !== 'number') throw new TypeError('amount is not a number')
    if (!amount) throw new LengthError('amount is empty')
    if (!(date instanceof Date)) throw new TypeError('date is not a Date')

    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)

            return Flow.create({ user: userId, type, kind, description, amount, date })
        })
}

module.exports = createFlow