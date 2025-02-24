import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; 

const UserBooksManagement = () => {
  const [userBooks, setUserBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = ['Education', 'Children\'s Books', 'Novel', 'Religious & Spiritual'];
  const navigate = useNavigate();  

  useEffect(() => {
    fetchUserBooks();
  }, []);

  const fetchUserBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/getAllBooks');
      setUserBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const filteredBooks = userBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? book.category === selectedCategory : true)
  );

  const handleRequestBook = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      await axios.post('http://localhost:5000/api/requests', { bookId }, { headers });
      Swal.fire('Success', 'Your request has been sent to the admin for approval.', 'success');
    } catch (error) {
      console.error('Error requesting book:', error.response ? error.response.data : error);
      Swal.fire('Error', 'Unable to request this book at the moment.', 'error');
    }
  };


  const navigateToProfile = () => {
    navigate('/UserProfile');  
  };

  const navigateToReadBook = () => {
    navigate('/ReadBook');
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

      <div className="mb-4">
        <select className="form-control" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
  <button
    className="btn btn-primary"
    style={{
      backgroundColor: "#e6ae59",
      color: "#fff",
      border: "none",
      padding: "10px 20px",  
      fontSize: "16px",       
      width: "200px",         
      textAlign: "center",   
    }}
    onClick={navigateToProfile}
  >
    Go to Profile
  </button>
</div>

<div className="mb-4">
  <button
    className="btn btn-primary"
    style={{
      backgroundColor: "#e6ae59",
      color: "#fff",
      border: "none",
      padding: "10px 20px",  
      fontSize: "16px",       
      width: "200px",         
      textAlign: "center",   
    }}
    onClick={navigateToReadBook}
  >
    Notification
  </button>
</div>


      <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
        {filteredBooks.map((book) => (
          <div key={book._id} className="col">
            <div className="card shadow-sm">
              {book.imageUrls && (
                <img src={book.imageUrls} alt={book.title} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
              )}
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.description}</p>
                <p className="card-text"><strong>Category: </strong>{book.category}</p>
                <button className="btn btn-info" style={{ backgroundColor: "#e6ae59", color: "#fff", border: "none" }} onClick={() => handleRequestBook(book._id)}>
                  Request to Read PDF
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
