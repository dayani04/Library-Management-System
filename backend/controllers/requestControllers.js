const Request = require('../models/requestModel');
const Book = require('../models/bookModel');
const User = require('../models/userModel');

const createRequest = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;  // Assuming JWT authentication

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const newRequest = new Request({
      bookId,
      userId,
      status: 'pending',  // Default status
    });

    await newRequest.save();
    res.status(201).json({ message: 'Request sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating book request' });
  }
};

const approveRequest = async (req, res) => {
    try {
      const requestId = req.params.id;
      const { startDate, endDate } = req.body; // Get start and end dates from the body
  
      const request = await Request.findByIdAndUpdate(
        requestId,
        {
          status: 'approved',
          startDate,
          endDate,
        },
        { new: true }
      );
  
      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }
  
      res.status(200).json({ message: 'Request approved successfully', request });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error approving the request' });
    }
  };
  
  
  const rejectRequest = async (req, res) => {
    try {
      const requestId = req.params.id;
      const { rejectionReason } = req.body; // Get rejection reason from request body
  
      const request = await Request.findByIdAndUpdate(
        requestId,
        { status: "rejected", rejectionReason }, // Store reason
        { new: true }
      );
  
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
  
      res.status(200).json({ message: "Request rejected successfully", request });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error rejecting the request" });
    }
  };
  
  const fetchRequests = async (req, res) => {
    try {
      const requests = await Request.find()
        .populate('userId', 'name')
        .populate('bookId', 'title pdfPath'); // Include pdfPath
  
      res.status(200).json({ requests, userId: req.user.id });
    } catch (error) {
      console.error('Error fetching requests:', error);
      res.status(500).json({ message: 'Error fetching requests' });
    }
  };
  
  const getAllRequests = async (req, res) => {
    try {
      const requests = await Request.find()
        .populate('userId', 'name')   // Fetch user name
        .populate('bookId', 'title'); // Fetch book title
  
      res.json({ requests });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = { createRequest, approveRequest, rejectRequest, fetchRequests,getAllRequests };
  
