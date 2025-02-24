import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const BooksManagement = () => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    category: '', 
    imageUrls: '',
    description: '',
    pdfFile: null,
  });
  const [isAddMode, setIsAddMode] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [editingBookId, setEditingBookId] = useState(null);

  const categories = ['Education', 'Children\'s Books', 'Novel', 'Religious & Spiritual'];
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/getAllBooks');
      setBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('genre', book.genre);
    formData.append('category', book.category); 
    formData.append('description', book.description);
    formData.append('imageUrls', book.imageUrls);
    formData.append('pdf', book.pdfFile);

    try {
      await axios.post('http://localhost:5000/api/books', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchBooks();
      resetForm();
      Swal.fire('Success!', 'Book added successfully.', 'success');
    } catch (error) {
      console.error('Error adding book:', error.response?.data || error);
      Swal.fire('Error!', error.response?.data?.message || 'Failed to add book.', 'error');
    }
  };

  const handleEditBook = (bookId) => {
    const bookToEdit = books.find((b) => b._id === bookId);
    if (bookToEdit) {
      setBook({
        title: bookToEdit.title,
        author: bookToEdit.author,
        genre: bookToEdit.genre,
        category: bookToEdit.category,
        imageUrls: bookToEdit.imageUrls,
        description: bookToEdit.description,
        pdfFile: null,
      });
      setEditingBookId(bookId);
      setIsUpdateMode(true);
      setIsAddMode(true); 
    }
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    const updatedData = {
      title: book.title,
      author: book.author,
      genre: book.genre,
      category: book.category, 
      imageUrls: book.imageUrls,
      description: book.description,
    };

    try {
      await axios.put(`http://localhost:5000/api/books/${editingBookId}`, updatedData);
      fetchBooks();
      resetForm();
      Swal.fire('Success!', 'Book updated successfully.', 'success');
    } catch (error) {
      console.error('Error updating book:', error);
      Swal.fire('Error!', 'Failed to update book.', 'error');
    }
  };

  const handleDeleteBook = (bookId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the book!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/api/books/${bookId}`)
          .then(() => {
            setBooks(books.filter((book) => book._id !== bookId));
            Swal.fire('Deleted!', 'The book has been deleted.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error!', 'Failed to delete book.', 'error');
          });
      }
    });
  };

  const resetForm = () => {
    setBook({ title: '', author: '', genre: '', category: '', imageUrls: '', description: '', pdfFile: null });
    setEditingBookId(null);
    setIsAddMode(false);
    setIsUpdateMode(false);
  };

  return (
    <section className="container py-5">
      <h1 className="text-center mb-4 font-bold" style={{ color: "#89590a" }}>Book Management</h1>
      <button
        className="btn mb-3"
        style={{ backgroundColor: "#e6ae59", color: "#fff", border: "none", padding: "10px 20px", fontSize: "16px" }}
        onClick={() => { setIsAddMode(true); setIsUpdateMode(false); }}
      >
        ➕ Add New Books
    </button>

      <br />

  <button
  className="btn mb-3"
  style={{ backgroundColor: "#e6ae59", color: "#fff", border: "none", padding: "10px 20px", fontSize: "16px" }}
  onClick={() => window.location.href = "/AdminRegister"} // Redirects to AdminRegister page
  >
    ➕ Add New Admin
  </button>

  <button
  className="btn mb-3"
  style={{
    backgroundColor: "#e6ae59",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    position: "absolute",
    top: "80px", // Adjust this value based on the height of your navbar
    right: "20px",
    zIndex: 10,
  }}
  onClick={() => window.location.href = "/RequestApproval"}
>
  Request Approval
</button>


      <div className="row row-cols-1 row-cols-md-3 g-4">
        {books.map((book) => (
          <div key={book._id} className="col">
            <div className="card shadow-sm border h-100">
              {book.imageUrls && <img src={book.imageUrls} alt={book.title} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />}
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.description}</p>
                <p className="card-text"><strong>Category: </strong>{book.category}</p>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditBook(book._id)}> Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteBook(book._id)}> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`modal ${isAddMode ? 'show' : ''}`} tabIndex="-1" style={{ display: isAddMode ? 'block' : 'none' }} aria-labelledby="bookModalLabel" aria-hidden={!isAddMode}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="bookModalLabel">{isUpdateMode ? 'Edit Book' : 'Add New Book'}</h5>
              <button type="button" className="btn-close" onClick={resetForm} aria-label="Close"></button>
            </div>
            <form onSubmit={isUpdateMode ? handleUpdateBook : handleAddBook}>
              <div className="modal-body">
                <input type="text" className="form-control mb-2" placeholder="Title" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} required />
                <input type="text" className="form-control mb-2" placeholder="Author" value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} required />
                <input type="text" className="form-control mb-2" placeholder="Genre" value={book.genre} onChange={(e) => setBook({ ...book, genre: e.target.value })} required />
                <select className="form-control mb-2" value={book.category} onChange={(e) => setBook({ ...book, category: e.target.value })} required>
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
                <input type="text" className="form-control mb-2" placeholder="Image URL" value={book.imageUrls} onChange={(e) => setBook({ ...book, imageUrls: e.target.value })} />
                <input type="text" className="form-control mb-2" placeholder="Description" value={book.description} onChange={(e) => setBook({ ...book, description: e.target.value })} />
                <input type="file" className="form-control mb-2" onChange={(e) => setBook({ ...book, pdfFile: e.target.files[0] })} required={!isUpdateMode} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={resetForm}>Close</button>
                <button type="submit" className="btn btn-primary">{isUpdateMode ? 'Update Book' : 'Add Book'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BooksManagement;