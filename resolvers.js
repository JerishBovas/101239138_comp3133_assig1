const User = require('./models/User')
const bcrypt = require('bcrypt');
const fs = require('fs');
const Listing = require('./models/Listing');

exports.resolvers = {
    //Query
    getUsers: async (args) => {
        return await User.find({})
    },
    message : () => 'Hello GraphQL',

    //Mutation
    addUser: async (args) => {
        let newPassword
        let saltRounds = 5;
        var passRegex = /[\w#$&]*/;
        if(passRegex.test(args.password)){
            bcrypt.hash(args.password, saltRounds, function(err, hash) {
                if(err){
                    console.log(err);
                    return
                }
                newPassword = hash;
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
    }
}