const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const apiData = require('./variables/variables');
const cors = require('cors');


const app = express();


// allow cross origin requests
app.use(cors());

// connect to the mlab database
mongoose.connect(apiData.mlabKey);
mongoose.connection.once('open', () => {
    console.log('connected to the database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000')
});
