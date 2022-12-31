const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

module.exports = new Schema({
    user: {
        type: ObjectId,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense']
    },
    kind:{
        type: String,
        required: true,
        enum: ['pension', 'gift', 'donation', 'food', 'supply', 'medicine', 'services', 'other']
    },
    description:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    }, date: {
        type: Date,
        require:true
    }
})

// Flow
// - user (ObjectId, required)
// - type (String, required, enum ['income', 'expense'])
// - kind (String, required, enum ['pension', 'gift', 'donation', 'food', 'supply', 'medicine', 'services', 'other'])
// - description (String, require)
// - amount (Number, required)
// - date (Date, required)

