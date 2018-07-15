import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import BookList from './components/BookList'




class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      books: []
    }
  }

  deleteBook = (e) => {
    const url = `http://localhost:3001/books/${e.target.id}`
    console.log(url);
    fetch(url, {
      method: 'delete',
    })
    .then(resp => resp.json())
    .then(books => {
      this.setState(
        {books: books.books}
      )
    })
    .catch(function(error) {
      console.log('error')
    })
  }

  componentDidMount(){
    return this.handleBookUpdate()
  }

  handleBookUpdate = (e) => {
    return fetch("http://localhost:3001/books")
    .then(response => response.json())

    .then(books => {
      this.setState({
        books: books.books
      })
    })
  }


  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <BookList books={this.state.books} deleteBook={this.deleteBook} handleBookUpdate={this.handleBookUpdate}/>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
