const { errors: { LengthError, NotFoundError } } = require('com')
const { User, Appointment } = require('../models')

function deleteAppointment(userId, appointmentId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')
    if (typeof appointmentId !== 'string') throw new TypeError('appointmentId is not a string')
    if (!appointmentId.length) throw new LengthError('appointmentId is empty')


    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new (NotFoundError`user with id ${userId} does not exist`)

            return Appointment.findById(appointmentId)
        })
        .then(appointment => {
            if (!appointment)
                throw new NotFoundError(`appointment with id ${appointmentId} does not exist`)

            if (appointment.user.toString() !== userId)
                throw new Error(`appointment with id ${appointmentId} does not belong to user with id ${userId}`)

            return Appointment.findByIdAndDelete(appointmentId)
        })

}
module.exports = deleteAppointment