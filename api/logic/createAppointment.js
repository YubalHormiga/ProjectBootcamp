const { errors: { LengthError, NotFoundError } } = require('com')
const { User, Appointment } = require('../models')

function createAppointment(userId, title, body, date) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')
    if (typeof title !== 'string') throw new TypeError('title is not a string')
    if (!title.length) throw new LengthError('title is empty')
    if (typeof body !== 'string') throw new TypeError('body is not a string')
    if (!body.length) throw new LengthError('body is empty')
    if (!(date instanceof Date)) throw new TypeError('date is not a Date')

    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)

            return Appointment.create({ user: userId, title, body, date })
        })
}

module.exports = createAppointment