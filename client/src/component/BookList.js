import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
// Component
import BookDetails from './BookDetails';

class BookList extends Component {

    constructor(props){
        super(props);
        this.state = {
            selected : null
        }
    }

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
                    <li key={ book.id } onClick={ (e) => { this.setState({ selected : book.id })} }> {book.name} </li> 
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
            <BookDetails bookId={ this.state.selected }/>
        </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
