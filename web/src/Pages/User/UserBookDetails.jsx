import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const UserBooksManagement = () => {
  const [userBooks, setUserBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // Category filter state

  // List of categories for filtering
  const categories = ['Education', 'Children\'s Books', 'Novel', 'Religious & Spiritual'];

  useEffect(() => {
    fetchUserBooks();
  }, []);

  const fetchUserBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/getAllBooks');
      setUserBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching books for user:', error);
    }
  };

  // Filter books based on search query and selected category
  const filteredBooks = userBooks.filter((book) =>
    (book.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory ? book.category === selectedCategory : true)
  );

  // Handle the download of the PDF
  const handleDownloadBook = (pdfPath) => {
    if (pdfPath) {
      // Create a link element
      const link = document.createElement('a');
      link.href = pdfPath; // Set the link's href to the PDF path
      link.target = '_blank'; // Open the PDF in a new tab
      link.download = pdfPath.split('/').pop(); // Use the file name from the path as the download filename
      link.click(); // Simulate a click to start the download
    } else {
      // Handle case when no PDF path is available
      Swal.fire('Error', 'PDF file not available for this book.', 'error');
    }
  };

  return (
    <div className="container py-5">
   
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <select className="form-control" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
        {/* Display filtered books */}
        {filteredBooks.map((book) => (
          <div key={book._id} className="col">
            <div className="card shadow-sm">
              {book.imageUrls && (
                <img
                  src={book.imageUrls}
                  alt={book.title}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.description}</p>
                <p className="card-text"><strong>Category: </strong>{book.category}</p>
                <button className="btn btn-info" style={{ backgroundColor: "#e6ae59", color: "#fff", border: "none" }} onClick={() => handleDownloadBook(book.pdfPath)}>
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBooksManagement;
