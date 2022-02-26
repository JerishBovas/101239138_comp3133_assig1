const { buildSchema } = require('graphql')

exports.schema = buildSchema(`
    type User {
        id: ID!
        username: String!
        firstname: String!
        lastname: String!
        email: String!
        password: String!
        type: String!
    }

    type Query {
        getUsers: [User]
        message: String
    }

    type Mutation {
        addUser(
            username: String!
            firstname: String!
            lastname: String!
            email: String!
            password: String!
            type: String!
        ): User
    }
`)