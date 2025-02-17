const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const bookControllers = require('../controllers/bookControllers');

// Multer storage setup for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save the uploaded files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the timestamp to avoid overwriting
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

// Routes
router.get('/getAllBooks', bookControllers.getAllBooks);
router.get('/:id', bookControllers.getBookById);
router.post('/', upload.single('pdf'), bookControllers.addBook); // File upload middleware here
router.put('/:id', bookControllers.updateBook);
router.delete('/:id', bookControllers.deleteBook);

module.exports = router;
