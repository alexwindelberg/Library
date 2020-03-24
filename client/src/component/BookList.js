import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

class BookList extends Component {

    displayBooks() {
        // These props have been set here by the graphql, you can see it when you load the
        // page and check the console. An object will be given this object will also contain a
        // loading property, once complete it will return a books array
        let data = this.props.data;
        if(data.loading) {
            return (
                <div> Loading Books...</div> 
            );
        }
        else {
            return data.books.map( book => {
                return ( 
                    <li key={ book.id }> {book.name} </li> 
                );
            });
        }
    }

    render () {
        console.log(this.props);
        return (
        <div>
            <ul id="book-list">
                { this.displayBooks() }
            </ul>
        </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
