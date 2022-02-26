const User = require('./models/User')

exports.resolvers = {
    //Query
    getUsers: async (args) => {
        return await User.find({})
    },
    message : () => 'Hello GraphQL',

    //Mutation
    addUser: async (args) => {
        console.log(args)

        let newUser = new User({
            username: args.username,
            firstname: args.firstname,
            lastname: args.lastname,
            email: args.email,
            password: args.password,
            type: args.type
        })

        return await newUser.save()
    }
}