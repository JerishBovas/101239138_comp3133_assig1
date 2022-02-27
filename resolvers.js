const User = require('./models/User')
const bcrypt = require('bcrypt');
const fs = require('fs');
const Listing = require('./models/Listing');
const Booking = require('./models/Booking');

exports.resolvers = {
    //Query
    getUsers: async (parent, args) => {
        console.log(parent);
        console.log(args);
        return await User.find({})
    },
    getListings: async (args) => {
        return await Listing.find({})
    },
    getBookings: async (args) => {
        return await Booking.find({})
    },
    login: async (args) => {
        let user = await User.find({username: args.username, password: args.password})
        
        if(true){
            bcrypt.compare(args.password, user.password, function(err, result) {
                if(err) return "Incorrect password. Login Failed"
                if(result) return "Login Successful"
            });
        }
        return "Can't find the user. Login Failed"
    },

    //Mutation
    addUser: async (args) => {
        
        let newPassword = "";
        let saltRounds = 5;
        var passRegex = /[\w#$&]*/;
        if(passRegex.test(args.password)){
            bcrypt.hash(args.password, saltRounds, function (err, hash) {
                if (err) {
                    console.log(err);
                    return;
                }
                newPassword = hash;
                console.log(newPassword);
            });
        }else{
            return "password doesnt match the requirements"
        }

        let newUser = new User({
            username: args.username,
            firstname: args.firstname,
            lastname: args.lastname,
            email: args.email,
            password: newPassword,
            type: args.type
        })
        console.log("coming here");

        return await newUser.save()
    },

    addListing: async (args) => {
        let count = fs.readFileSync('./models/listing_counter.txt', 'utf8');
        const newListing = new Listing({
            listing_id: 'L'+ ++count,
            listing_title: args.listing_title,
            description: args.description,
            street: args.street,
            city: args.city,
            postal_code: args.postal_code,
            price: args.price,
            email: args.email,
            username: args.username
        });
        fs.writeFileSync('./models/listing_counter.txt', count.toString())
    
        return await newListing.save();
    },

    addBooking: async (args) => {
        let count = fs.readFileSync('./models/booking_counter.txt', 'utf8');
        const newBooking = new Booking({
            booking_id: 'B' + ++count,
            listing_id: args.listing_id,
            booking_start: args.booking_start,
            booking_end: args.booking_end,
            username: args.username
        });
        fs.writeFileSync('./models/booking_counter.txt', count.toString())
    
        return await newBooking.save();
    }
}