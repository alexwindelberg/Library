const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

// This is creating the schema in graphQL
const AuthorType = new GraphQLObjectType({
    name      : 'Author',
    fields    : () => ({
        id    : { type: GraphQLID },
        name  : { type: GraphQLString },
        age   : { type: GraphQLInt },
        books : {
            type : new GraphQLList(BookType),
            resolve (parent, args) {
                //return _.filter(books, { authorId : parent.id });
            }
        }
    })
});

// This is creating the schema we will be following in graphQL
const BookType = new GraphQLObjectType({
    name            : 'Book',
    fields          : () => ({
        id          : { type: GraphQLID },
        name        : { type: GraphQLString },
        genre       : { type: GraphQLString },
        author      : {
            // we are linking the books to the authors
            type    : AuthorType,
            resolve(parent, args) {
                 console.log(parent);
                //return _.find(authors, { id: parent.authorId });
            }
        }
    })
});


// Root Queries are the initial queries
// They're the queries that are at ran at init and tie us to
// other schema relationships
const RootQuery = new GraphQLObjectType ({
    name     : 'RootQueryType',
    fields   : {
        // On the front-end when querying this label is the keyword we're using to query
        // the book query accepts an id of GraphQLID type and uses it retrieve the requested
        // book from the BookType then returns it's result
        book : {
            type : BookType,
            args : { id : { type : GraphQLID } }, // we are changing from GraphQLString to ID type
            resolve (parent, args) {
                // check your terminal running nodemon to see output
                // console.log( typeof(args.id) );

                // code to get the data from the db / other sources 
                // using lodash
                //return _.find(books, { id: args.id });
            }
        },
        author : {
            type : AuthorType,
            args : { id : { type : GraphQLID } },
            resolve (parent, args) { 
                //return _.find(authors, { id: args.id });
            }
        },
        books : {
            type : new GraphQLList(BookType),
            resolve (parent, args) {
                //return books;
            }
        },
        authors : {
            type : new GraphQLList(AuthorType),
            resolve (parent, args) {
                //return authors;
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields: {
        addAuthor : {
            type : AuthorType,
            args : {
                name : { type : GraphQLString },
                age  : { type : GraphQLInt },
            },
            resolve (parent, args) {
                let author = new Author({
                    name : args.name,
                    age  : args.age,
                });

                return author.save();
            }
        },
        addBook : {
            type : BookType,
            args : {
                name   : { type : GraphQLString },
                genre  : { type : GraphQLString },
                author : { type : GraphQLID }
            },
            resolve (parent, args) {
                let book = new Book({
                    name : args.name,
                });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation,
});