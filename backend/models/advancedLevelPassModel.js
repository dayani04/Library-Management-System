const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advancedLevelPassSchema = new Schema(
  {
    pdfPath: { type: String, required: true },
    description: { type: String, required: true },
    passYear: { type: String, required: true }, // Year of the pass
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdvancedLevelPass", advancedLevelPassSchema);
