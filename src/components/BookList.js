import React from "react"

class BookList extends React.Component{
  render(){
    return(
      <section>
        <h2>Book Listings</h2>
        <ul id="book-listings">
          {this.props.books.map(book => {
            return(
              <li key={book.title}>
                <h4>{book.title}</h4>
                <h4>{book.author}</h4>
                <h4>{book.year}</h4>
                <h4>{book.pages}</h4>
              </li>
            )
          })}

        </ul>
      </section>
    )
  }
}

export default BookList
