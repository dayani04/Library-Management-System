const multer = require('multer');
const path = require('path');
const Book = require('../models/bookModel');

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = file.mimetype.startsWith('image/') ? 'uploads/images/' : 'uploads/pdfs/';
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Controller functions
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json({ books });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addBook = async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      category: req.body.category, // Handle category here
      imageUrls: req.body.imageUrls,
      pdfPath: req.file.path,
      description: req.body.description,
    });

    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      category: req.body.category, // Handle category here
      imageUrls: req.body.imageUrls,
      pdfPath: req.body.pdfPath,
      description: req.body.description,
    }, { new: true });

    res.status(200).json({ message: 'Book updated successfully', updatedBook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllBooks, getBookById, addBook, updateBook, deleteBook };




