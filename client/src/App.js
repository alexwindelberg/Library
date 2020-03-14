import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
 
// Components
import BookList from './component/BookList';

//Apollo client
const client = new ApolloClient({
  // This needs to point to the place we are sending requests to graphql
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <div id="main">
            <h1>Ninja's Reading List</h1>
            <BookList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
