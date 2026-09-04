const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    resumeScore: {
        type: Number,
        default: 0,
    },

    atsScore: {
        type: Number,
        default: 0,
    },

    strengths: [
        {
            type: String,
        },
    ],

    weaknesses: [
        {
            type: String,
        },
    ],

    skillsDetected: [
        {
            type: String,
        },
    ],

    missingSkills: [
        {
            type: String,
        },
    ],

    suggestions: [
        {
            type: String,
        },
    ],

},
{
    timestamps: true,
}
);

module.exports = mongoose.model(
    "ResumeAnalysis",
    resumeSchema
);