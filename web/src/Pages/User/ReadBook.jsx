import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const ReadBook = () => {
  const [userRequests, setUserRequests] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/requests', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch requests');

      const data = await response.json();
      setLoggedInUserId(data.userId);
      
      const userRequests = data.requests.filter((request) => request.userId._id === data.userId);
      setUserRequests(userRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
      Swal.fire('Error', 'Failed to fetch your requests.', 'error');
    }
  };

  const handleReadBook = (pdfPath, title, startDate, endDate) => {
    const currentDate = new Date();
    if (currentDate > new Date(endDate)) {
      Swal.fire('Error', 'The reading period has ended.', 'error');
      return;
    }
  
    if (pdfPath && pdfPath.includes('uploads/pdfs/')) {
      const fullPdfPath = `http://localhost:5000/${pdfPath}`;
      window.open(fullPdfPath, '_blank');
    } else {
      Swal.fire('Error', 'PDF path is not available.', 'error');
    }
  };
  

  return (
    <div className="container py-5">
      <h2>Your Book Requests</h2>
      
      {/* Approved Books Section */}
      <div className="mt-4">
        <h4>Approved Books</h4>
        <div className="list-group mt-3">
          {userRequests.filter(request => request.status === 'approved').map((request) => (
            <div key={request._id} className="list-group-item">
              <div className="d-flex justify-content-between">
                <div>
                  <p><strong>Book: </strong>{request.bookId?.title || 'N/A'}</p>
                  <p><strong>Reading Period: </strong>{new Date(request.startDate).toLocaleDateString()} to {new Date(request.endDate).toLocaleDateString()}</p>
                  <button 
                    className="btn btn-primary" 
                    style={{ backgroundColor: "#e6ae59", color: "#fff", border: "none" }} 
                    onClick={() => handleReadBook(request.bookId?.pdfPath, request.bookId?.title, request.startDate, request.endDate)}
                  >
                    Read / Download {request.bookId?.title}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rejected Books Section */}
      <div className="mt-4">
        <h4>Rejected Books</h4>
        <div className="list-group mt-3">
          {userRequests.filter(request => request.status === 'rejected').length === 0 ? (
            <p>No rejected books yet!</p>
          ) : (
            userRequests.filter(request => request.status === 'rejected').map((request) => (
              <div key={request._id} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <div>
                    <p><strong>Book: </strong>{request.bookId?.title || 'N/A'}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadBook;
