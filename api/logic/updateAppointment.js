const { errors: { LengthError, NotFoundError } } = require('com')
const { User, Appointment } = require('../models')

module.exports = function (userId, title, body, date, appointmentId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')
    if (typeof appointmentId !== 'string') throw new TypeError('appointmentId is not a string')
    if (!appointmentId.length) throw new LengthError('appointmentId is empty')
    if (typeof title !== 'string') throw new TypeError('title is not a string')
    if (!title.length) throw new LengthError('title is empty')
    if (typeof body !== 'string') throw new TypeError('body is not a string')
    if (!body.length) throw new LengthError('body is empty')
    if (!(date instanceof Date)) throw new TypeError('date is not a Date')
    if(!date) throw new LengthError('Date is empty')




    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)
            //?.lean() consultar
            return Appointment.findById(appointmentId)
        })
        .then(appointment => {
            if (!appointment)
                throw new NotFoundError(`appointment with id ${appointmentId} does not exist`)

            if (appointment.user.toString() !== userId)
                throw new NotFoundError(`appointment with id ${appointmentId} does not belong to user with id ${userId}`)


            return Appointment.updateOne({ _id: appointmentId }, { $set: { title, body, date } })
        })

}