const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, 'Please select a product'],
        enum: ['Pixel 1', 'Pixel 2', 'Pixel 3', 'Pixel 4', 'Pixel 5', 'Pixel 6', 'Pixel 6 Pro', 'Pixel 6a', 'Pixel 7', 'Pixel 7 Pro', 'Pixel 7a', 'Pixel 8', 'Pixel 8 Pro', 'Pixel Fold'] 
    },
    description: {
        type: String,
        required: [true, 'Please enter a description of the issue!']
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'open', 'closed'],
        default: 'new'
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Ticket', ticketSchema)