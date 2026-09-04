const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  file: {
    type: String,
    required: true,
  },
});

const companyPreparationSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
    },

    logo: {
      type: String,
      default: "",
    },

    pdfs: [pdfSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CompanyPreparation",
  companyPreparationSchema
);