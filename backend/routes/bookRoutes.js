const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const bookControllers = require('../controllers/bookControllers');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = file.mimetype.startsWith('image/') ? 'uploads/images/' : 'uploads/pdfs/';
    cb(null, uploadPath);  // Adjust path as needed
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

// Routes
router.get('/getAllBooks', bookControllers.getAllBooks);

router.post('/', upload.single('pdf'), bookControllers.addBook); // File upload middleware here
router.put('/:id', bookControllers.updateBook);
router.delete('/:id', bookControllers.deleteBook);
router.get('/books/:id',  bookControllers.getBookById);


module.exports = router;
