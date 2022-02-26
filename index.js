const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const schema = require('./schema')
const rootResover = require('./resolvers')
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('Connected to Database')
}).catch(err => {
    console.log('Error Mongodb connection')
});

var app = express()
app.use(bodyParser.json());
app.use('*', cors());
app.use("/graphql", graphqlHTTP ({
    schema: schema.schema,
    rootValue: rootResover.resolvers,
    graphiql: true
}))
app.listen(process.env.PORT, () => {
    console.log(`Express GraphQL Server running at http://localhost:${process.env.PORT}/graphql`);
})