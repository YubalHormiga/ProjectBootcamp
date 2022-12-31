const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

module.exports = new Schema({
    user: {
        type: ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        require:true
    },
})

// Appointment
// - user (ObjectId, required)
// - title (String)
// - body (String, required)
// - date (Date, required)

