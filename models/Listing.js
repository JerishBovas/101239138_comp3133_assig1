const mongoose = require('mongoose')

const ListingSchema = new mongoose.Schema({
    listing_id: {
        type: String,
        required: true,
    },
    listing_title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 25,
        maxlength: 1000,
        trim: true
    },
    street: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    postal_code: {
        type: String,
        required: true,
        trim: true,
        $replaceAll: {
            input: "$postal_code",
            find: " ",
            replacement: ""
        },
        minlength: 6,
        maxlength: 6
    },
    price: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email address"],
        trim: true,
        uppercase: true,
        validate: function(value) {
          var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(value);
        }
    },
    username: {
        type: String,
        required: [true, 'Please enter a UserName'],
        trim: true
    }
})

module.exports = mongoose.model('Listings', ListingSchema)