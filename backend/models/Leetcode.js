const mongoose = require("mongoose");

const syncHistorySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    problemsSolved: {
      type: Number,
      default: 0,
    },
    totalSolved: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

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
    syncHistory: {
      type: [syncHistorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Leetcode", leetcodeSchema);