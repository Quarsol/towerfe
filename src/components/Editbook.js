import React from "react"

class Editbook extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      book: this.props.book
    }
  }

  handleChange = (e) => {
    let newBook = {...this.state.book}
    newBook[e.target.name]= e.target.value
    this.setState({book: newBook});
 }

  handleSubmit = (e) => {
    e.preventDefault();
    this.editBook()
}

editBook = (e) => {

   const postUrl = `https://book-watcher.herokuapp.com/books/${this.state.book.id}`

   let content = {
       image: this.state.book.image,
       title: this.state.book.title,
       author: this.state.book.author,
       year: this.state.book.year,
       pages: this.state.book.pages
     }
     return fetch(postUrl, {
       method: 'PUT',
       headers: new Headers({
         'Content-Type': 'application/json'
       }),
       body: JSON.stringify(content)

     })
     .then(resp => resp.json())
     .then(resp => this.props.handleBookUpdate(resp))
     .catch(function(error) {
       console.log('error')
     })

 }
 render(){
   return(
     <form onSubmit={this.handleSubmit}>
       <label>
         Image:
         <input type="text" name="image" defaultValue={this.state.book.image} onChange={this.handleChange} />
       </label>
       <label>
         Title:
         <input type="text" name="title" defaultValue={this.state.book.title} onChange={this.handleChange} />
       </label>
       <label>
         Author:
         <input type="text" name="author" defaultValue={this.state.book.author} onChange={this.handleChange} />
       </label>
       <label>
         Year:
         <input type="text" name="year" defaultValue={this.state.book.year} onChange={this.handleChange} />
       </label>
       <label>
         Pages:
         <input type="text" name="pages" defaultValue={this.state.book.pages} onChange={this.handleChange} />
       </label>
       <input type="submit" value="Submit" />
     </form>
   )
 }
}

export default Editbook
