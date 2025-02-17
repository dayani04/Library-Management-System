const multer = require('multer');
const path = require('path');
const AdvancedLevelPass = require('../models/advancedLevelPassModel');

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

// Add an advanced level pass paper
const addAdvancedLevelPass = async (req, res, next) => {
  upload.single('pdf')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const newPassPaper = new AdvancedLevelPass({
        pdfPath: req.file.path,
        description: req.body.description,
        passYear: req.body.passYear,
      });

      await newPassPaper.save();
      res.status(201).json({ message: 'Advanced Level Pass Paper added successfully' });
    } catch (error) {
      console.error('Error adding advanced level pass paper:', error);
      res.status(500).json({ message: error.message });
    }
  });
};

// Update an advanced level pass paper
const updateAdvancedLevelPass = async (req, res, next) => {
  try {
    const updatedPassPaper = await AdvancedLevelPass.findByIdAndUpdate(req.params.id, {
      pdfPath: req.body.pdfPath,
      description: req.body.description,
      passYear: req.body.passYear,
    }, { new: true });

    res.status(200).json({ message: 'Advanced Level Pass Paper updated successfully', updatedPassPaper });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an advanced level pass paper
const deleteAdvancedLevelPass = async (req, res, next) => {
  try {
    await AdvancedLevelPass.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Advanced Level Pass Paper deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all advanced level pass papers
const getAllAdvancedLevelPass = async (req, res, next) => {
  try {
    const passPapers = await AdvancedLevelPass.find();
    res.status(200).json(passPapers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single advanced level pass paper by ID
const getAdvancedLevelPassById = async (req, res, next) => {
  try {
    const passPaper = await AdvancedLevelPass.findById(req.params.id);
    if (!passPaper) {
      return res.status(404).json({ message: 'Pass paper not found' });
    }
    res.status(200).json(passPaper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addAdvancedLevelPass,
  updateAdvancedLevelPass,
  deleteAdvancedLevelPass,
  getAllAdvancedLevelPass,
  getAdvancedLevelPassById
};
