
const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    resumeScore: {
      type: Number,
      default: 0,
    },

    atsScore: {
      type: Number,
      default: 0,
    },

    breakdown: {
      contact: Number,
      education: Number,
      skills: Number,
      projects: Number,
      experience: Number,
      formatting: Number,
      grammar: Number,
    },

    strengths: [String],
    weaknesses: [String],
    skillsDetected: [String],
    missingSkills: [String],
    suggestions: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ResumeAnalysis",
  resumeSchema
);
