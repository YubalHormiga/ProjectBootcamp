const { errors: { FormatError, NotFoundError } } = require('com')
const { User, Appointment } = require('../models')

/**
 * Retrieves a appointment from user
 * @param {string} userId The user id
 * @param {string} appointmentId The appointment id
 */
module.exports = function (userId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new FormatError('userId is empty')

    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)

            return Appointment.find({ user: userId }).sort({ date: 1 }).lean() //? no recoge sort({ date: -1 }).toArray()
        })
        .then(appointments => {
            appointments.forEach(appointment => {
                appointment.id = appointment._id.toString()

                delete appointment._id
                delete appointment.user
                delete appointment.__v
            })

            return appointments
        })
}