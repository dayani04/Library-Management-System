const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  startDate: { type: Date }, // Start date of the reading period
  endDate: { type: Date }, // End date of the reading period
});

module.exports = mongoose.model('Request', requestSchema);
