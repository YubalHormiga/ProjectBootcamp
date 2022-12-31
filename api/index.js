require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')

//!USER
const authenticateUserHandler = require('./handlers/authenticateUserHandler')
const registerUserHandler = require('./handlers/registerUserHandler')
const retrieveUserHandler = require('./handlers/retrieveUserHandler')
//!APPOIMENT
const createAppointmentHandler = require('./handlers/createAppointmentHandler')
const retrieveAppointmentHandler = require('./handlers/retrieveAppointmentHandler')
const retrieveAppointmentsHandler = require('./handlers/retrieveAppointmentsHandler')
const updateAppointmentHandler = require('./handlers/updateAppointmentHandler')
const deleteAppointmentHandler = require('./handlers/deleteAppointmentHandler')

//!FLOW
const createFlowHandler = require('./handlers/createFlowHandler')
const retrieveFlowHandler = require('./handlers/retrieveFlowHandler')
const retrieveFlowsHandler = require('./handlers/retrieveFlowsHandler')
const updateFlowHandler = require('./handlers/updateFlowHandler')
const deleteFlowHandler = require('./handlers/deleteFlowHandler')



const jsonBodyParser = require('./utils/jsonBodyParser')
const cors = require('./utils/cors')
const jwtVerifier = require('./utils/jwtVerifier')

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log(`db connected to ${MONGODB_URL}`)

        const api = express()

        api.use(cors)
        //!USER
        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)
        api.post('/users', jsonBodyParser, registerUserHandler)
        api.get('/users', jwtVerifier, retrieveUserHandler)
        //!APPOINTMENT
        api.post('/appointment', jwtVerifier, jsonBodyParser, createAppointmentHandler)
        api.get('/appointment', jwtVerifier, retrieveAppointmentsHandler)
        api.get('/appointment/:appointmentId', jwtVerifier, retrieveAppointmentHandler)
        api.patch('/appointment/:appointmentId', jwtVerifier, jsonBodyParser, updateAppointmentHandler)
        api.delete('/appointment/:appointmentId', jwtVerifier, deleteAppointmentHandler)
        //!FLOW
        api.post('/flow', jwtVerifier, jsonBodyParser, createFlowHandler)
        api.get('/flow', jwtVerifier, retrieveFlowsHandler)
        api.get('/flow/:flowId', jwtVerifier, retrieveFlowHandler)
        api.patch('/flow/:flowId', jwtVerifier, jsonBodyParser, updateFlowHandler)
        api.delete('/flow/:flowId', jwtVerifier, deleteFlowHandler)
        
        const { PORT } = process.env
        api.listen(PORT, () => console.log(`server listening on port ${PORT}`))
    })
    .catch(error => console.error(error))