const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a UserName'],
        trim: true,
        unique: true
    },
    firstname: {
        type: String,
        required: [true, 'Please enter your First Name'],
        trim: true,
        lowercase: true
    },
    lastname: {
        type: String,
        alias: 'surname',
        required: [true,"Please enter your Last Name"],
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        validate: function(value) {
          var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(value);
        }
    },
    password: {
        type: String,
        required: true
        // minlength: 6,
        // validate: function(value) {
        //     var passRegex = /[\w#$&]*/;
        //     return passRegex.test(value);
        // }
    },
    type: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    }
})

module.exports = mongoose.model('Users', UserSchema)