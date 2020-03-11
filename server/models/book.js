const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This not to be confused with schema folder and js file is a function that we are calling from
// the mongoose library to create a schema
const bookSchema = new Schema({
    name     : String,
    genre    : String,
    authorId : String,  
});