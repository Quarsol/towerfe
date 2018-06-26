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

  componentDidMount(){
    fetch("http://localhost:3001/books")
    .then(response => response.json())
    .then(books => {
      this.setState({
        books: books
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <BookList books={this.state.books}/>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
