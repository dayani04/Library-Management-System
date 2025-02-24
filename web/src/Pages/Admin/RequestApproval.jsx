import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const RequestApproval = () => {
  const [requests, setRequests] = useState([]);


  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/requests', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data); 
      setRequests(response.data.requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleApproveRequest = async (requestId) => {
    const { value: dates } = await Swal.fire({
      title: 'Select Borrowing Period',
      html: `
        <input type="date" id="start-date" class="swal2-input" placeholder="Start Date" />
        <input type="date" id="end-date" class="swal2-input" placeholder="End Date" />
      `,
      showCancelButton: true,
      confirmButtonText: 'Approve',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        if (!startDate || !endDate) {
          Swal.showValidationMessage('Please select both start and end dates.');
          return false;
        }
        return { startDate, endDate };
      },
    });
  
    if (dates) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/requests/approve/${requestId}`,
          { startDate: dates.startDate, endDate: dates.endDate },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
  
        Swal.fire('Success', 'The request has been approved!', 'success');
        fetchRequests();
      } catch (error) {
        console.error('Error approving request:', error);
        Swal.fire('Error', 'Failed to approve the request.', 'error');
      }
    }
  };
  

  const handleRejectRequest = async (requestId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/requests/reject/${requestId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      Swal.fire('Success', 'The request has been rejected!', 'success');
      fetchRequests(); 
    } catch (error) {
      console.error('Error rejecting request:', error);
      Swal.fire('Error', 'Failed to reject the request.', 'error');
    }
  };

  return (
    <div className="container py-5">
      <h2>Request Approval System</h2>
      <div className="mt-4">
        <h4>User Requests</h4>
        <div className="list-group mt-3">
          {requests.map((request) => (
            <div key={request._id} className="list-group-item">
              <div className="d-flex justify-content-between">
                <div>
                  <p><strong>Book: </strong>{request.bookId?.title || 'N/A'}</p>
                  <p><strong>User: </strong>{request.userId?.name || 'N/A'}</p>
                  <p><strong>Status: </strong>{request.status}</p>
                </div>
                <div>
                  <button className="btn btn-success me-2" onClick={() => handleApproveRequest(request._id)}>Approve</button>
                  <button className="btn btn-danger" onClick={() => handleRejectRequest(request._id)}>Reject</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestApproval;
