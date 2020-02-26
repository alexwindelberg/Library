const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

// This is creating the schema we will be following in graphQL
const BookType = new GraphQLObjectType({
    name      : 'Book',
    fields    : () => ({
        id    : { type: GraphQLString },
        name  : { type: GraphQLString },
        genre : { type: GraphQLString },
    })  
});


// Root Queries are the initial queries
// They're the queries that are at ran at init and tie us to
// other relationship
const RootQuery = new GraphQLObjectType ({
    name     : 'RootQueryType',
    fields   : {
        // On the front-end when querying this label is the keyword we're querying for
        book : {
            type : BookType,
            args : { id : { type : GraphQLString } }
        }
    }
})
