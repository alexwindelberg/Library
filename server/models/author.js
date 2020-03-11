const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This not to be confused with schema folder and js file is a function that we are calling from
// the mongoose library to create a schema
const authorSchema = new Schema({
    name     : String,
    age      : Number,
});

// model is the same as a collection 
module.exports = mongoose.model('Author', authorSchema);