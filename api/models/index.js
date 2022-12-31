const { model } = require('mongoose')
const { user, appointment, flow, budget } = require('./schemas')

const User = model('User', user)
const Appointment = model('Appointment', appointment)
const Flow = model('Flow', flow)

module.exports = {
    User,
    Appointment,
    Flow,
}