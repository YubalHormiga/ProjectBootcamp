const { errors: { FormatError, NotFoundError } } = require('com')
const { User, Appointment } = require('../models')

/**
 * Retrieves a appointment from user
 * @param {string} userId The user id
 * @param {string} appointmentId The appointment id
 */
module.exports = function (userId, appointmentId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new FormatError('userId is empty')
    if (typeof appointmentId !== 'string') throw new TypeError('appointmentId is not a string')
    if (!appointmentId.length) throw new FormatError('appointmentId is empty')

    return User.findById(userId) // .findOne({ _id: ... })
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)

            return Appointment.findById(appointmentId).lean()
        })
        .then(appointment => {
            if (!appointment)
                throw new NotFoundError(`appointment with id ${appointmentId} does not exist`)

            delete appointment._id
            delete appointment.user
            delete appointment.date

            return appointment
        })
}