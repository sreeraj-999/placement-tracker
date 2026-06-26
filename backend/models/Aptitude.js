const mongoose = require("mongoose");

const aptitudeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    quant: Number,
    logical: Number,
    verbal: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Aptitude",
  aptitudeSchema
);