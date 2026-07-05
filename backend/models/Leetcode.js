const mongoose = require("mongoose");

const leetcodeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    username: {
      type: String,
      required: true,
    },

    totalSolved: {
      type: Number,
      default: 0,
    },

    easySolved: {
      type: Number,
      default: 0,
    },

    mediumSolved: {
      type: Number,
      default: 0,
    },

    hardSolved: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Leetcode", leetcodeSchema);