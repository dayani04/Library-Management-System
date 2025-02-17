const multer = require('multer');
const path = require('path');
const OrdinaryLevelPass = require('../models/ordinaryLevelPassModel');

// Define storage configuration for the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // The folder where you want to store the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename will be unique using timestamp
  },
});

const upload = multer({ storage: storage });

// Add an ordinary level pass paper
const addOrdinaryLevelPass = async (req, res, next) => {
  upload.single('pdf')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const newPassPaper = new OrdinaryLevelPass({
        pdfPath: req.file.path,
        description: req.body.description,
        passYear: req.body.passYear,
      });

      await newPassPaper.save();
      res.status(201).json({ message: 'Ordinary Level Pass Paper added successfully' });
    } catch (error) {
      console.error('Error adding ordinary level pass paper:', error);
      res.status(500).json({ message: error.message });
    }
  });
};

// Update an ordinary level pass paper
const updateOrdinaryLevelPass = async (req, res, next) => {
  try {
    const updatedPassPaper = await OrdinaryLevelPass.findByIdAndUpdate(req.params.id, {
      pdfPath: req.body.pdfPath, 
      description: req.body.description,
      passYear: req.body.passYear,
    }, { new: true });

    res.status(200).json({ message: 'Ordinary Level Pass Paper updated successfully', updatedPassPaper });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an ordinary level pass paper
const deleteOrdinaryLevelPass = async (req, res, next) => {
  try {
    await OrdinaryLevelPass.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Ordinary Level Pass Paper deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all ordinary level pass papers
const getAllOrdinaryLevelPass = async (req, res, next) => {
  try {
    const passPapers = await OrdinaryLevelPass.find();
    res.status(200).json(passPapers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single ordinary level pass paper by ID
const getOrdinaryLevelPassById = async (req, res, next) => {
  try {
    const passPaper = await OrdinaryLevelPass.findById(req.params.id);
    if (!passPaper) {
      return res.status(404).json({ message: 'Pass paper not found' });
    }
    res.status(200).json(passPaper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOrdinaryLevelPass,
  updateOrdinaryLevelPass,
  deleteOrdinaryLevelPass,
  getAllOrdinaryLevelPass,
  getOrdinaryLevelPassById
};
