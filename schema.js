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

    type Listing {
        id: ID!
        listing_id: String!
        listing_title: String!
        description: String!
        street: String!
        city: String!
        postal_code: String!
        price: Float!
        email: String!
        username: String!
    }

    type Booking {
        id: ID!
        listing_id: String!
        booking_id: String!
        booking_date: String
        booking_start: String!
        booking_end: String!
        username: String!
    }

    type Query {
        getUsers: [User]
        getListings: [Listing]
        getBookings: [Booking]
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

        addListing(
            listing_id: String!
            listing_title: String!
            description: String!
            street: String!
            city: String!
            postal_code: String!
            price: Float!
            email: String!
            username: String!
        ) : Listing

        addBooking(
            booking_id: String!
            listing_id: String!
            booking_date: String
            booking_start: String!
            booking_end: String!
            username: String!
        ):Booking
    }
`)