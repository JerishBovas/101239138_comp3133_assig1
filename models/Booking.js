const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    listing_id: {
        type: String,
        required: true,
    },
    booking_id: {
        type: String,
        required: true
    },
    booking_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    booking_start: {
        type: Date,
        required: true
    },
    booking_end: {
        type:Date,
        required: true
    },
    username: {
        type: String,
        required: [true, 'Please enter a UserName'],
        trim: true
    }
})

module.exports = mongoose.model('Bookings', BookingSchema)