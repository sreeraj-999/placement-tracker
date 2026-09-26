const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: [
        "quantitative",
        "logical",
        "verbal",
      ],
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      required: true,

      validate: {
        validator: function (value) {
          return (
            Array.isArray(value) &&
            value.length === 4
          );
        },

        message:
          "Exactly 4 options are required.",
      },
    },

    correctAnswer: {
      type: String,
      required: true,
      trim: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Question",
  questionSchema
);