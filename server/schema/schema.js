const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id:'1' },
    { name: 'The Final Empire', genre: 'Fantasy', id:'2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id:'3' },
];


// This is creating the schema we will be following in graphQL
const BookType = new GraphQLObjectType({
    name      : 'Book',
    fields    : () => ({
        id    : { type: GraphQLID },
        name  : { type: GraphQLString },
        genre : { type: GraphQLString },
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
                // code to get the data from the db / other sources 
                // using lodash
                return _.find(books, { id: args.id });
            }
        }
    }
});



module.exports = new GraphQLSchema({
    query:RootQuery
});