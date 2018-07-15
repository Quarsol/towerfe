import React from "react"
import {Modal, Button} from "react-materialize"
import Editbook from "./Editbook"

class BookList extends React.Component{
  state = {
    form: {
      image: "",
      title: "",
      author: "",
      year: "",
      pages: "",
    }
  }

  handleChange = (e) => {
   this.setState({[e.target.name]: e.target.value});
 }

  handleSubmit = (e) => {
   e.preventDefault();
   this.addBook()
 }

 addBook = (e) => {

    const postUrl = `http://localhost:3001/books`

    let content = {
        image: this.state.image,
        title: this.state.title,
        author: this.state.author,
        year: this.state.year,
        pages: this.state.pages
      }

      return fetch(postUrl, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(content)

      })
      .then(resp => resp.json())
      // .then(resp => console.log(resp))
      .then(resp => this.props.handleBookUpdate(resp.book))
      // .catch(function(error) {
      //   console.log('error')
      // })

  }



  // deleteBook = (e) => {
  //   // console.log(e.target.id);
  //     const url = `http://localhost:3001/books/${e.target.id}`
  //     console.log(url);
  //     fetch(url, {
  //       method: 'delete',
  //     })
  //     .then(resp => resp.json())
  //     .then(allBooks => {
  //       this.setState(
  //         {allBooks}
  //       )
  //       // console.log(allBooks);
  //     })
  //     .catch(function(error) {
  //       console.log('error')
  //   })
  // }
  render(){
    return(
      <section>
        <h2>Book Listings</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Image:
            <input type="text" name="image" value={this.state.value} onChange={this.handleChange} />
          </label>
          <label>
            Title:
            <input type="text" name="title" value={this.state.value} onChange={this.handleChange} />
          </label>
          <label>
            Author:
            <input type="text" name="author" value={this.state.value} onChange={this.handleChange} />
          </label>
          <label>
            Year:
            <input type="text" name="year" value={this.state.value} onChange={this.handleChange} />
          </label>
          <label>
            Pages:
            <input type="text" name="pages" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <ul id="book-listings">
          {this.props.books.map(book => {
            return(
              <li key={book.id}>
                <img src={book.image} alt="cover"></img>
                <h4>{book.title}</h4>
                <h4>{book.author}</h4>
                <h4>{book.year}</h4>
                <h4>{book.pages}</h4>
                <Modal
                  header='Modal Header'
                  trigger={<Button>Edit</Button>}>
                  <Editbook book={book} handleBookUpdate={this.props.handleBookUpdate}/>
                </Modal>
                {/* <button id={book.id} onClick={this.props.editBook}>Edit</button> */}
                <button id={book.id} onClick={this.props.deleteBook}>Delete</button>

              </li>
            )
          })}

        </ul>
      </section>
    )
  }
}

export default BookList
